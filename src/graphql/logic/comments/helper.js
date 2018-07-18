import Comments from '../../../models/comment';
import Commenters from '../../../models/commenter';
import Tenants from '../../../models/tenant';
import Books from '../../../models/book';

/**
 * Prepare options to comment query
 * @param {number} skip - number of comments to skip
 * @param {number} limit - limit of comments to show
 */

const COMMENT_ID_LENGTH = 7;
const prepareGetCommentsOptions = (limit, skip, sortRecent) => {

	const options = {
		sort: {
			'lemmaCitation.ctsNamespace': 1,
			'lemmaCitation.textGroup': 1,
			'lemmaCitation.work': 1,
			'lemmaCitation.passageIndex': 1, // TODO: test sorting on array value or if not need to store index from textserver
			nLines: -1,
		}
	};

	if (skip) {
		options.skip = skip;
	} else {
		options.skip = 0;
	}
	if (limit) {
		if (limit > 100) {
			options.limit = 100;
		}
		options.limit = limit;
	} else {
		options.limit = 30;
	}
	if (sortRecent) {
		options.sort = { updated: -1 };
	}
	return options;
};

const _getCommentURN = comment => new Promise(function(resolve, rejected) {
	Tenants.findOne({_id: comment.tenantId}).then(function(tenant) {
		const urnPrefixV1 = 'urn:cts:CHS.Commentary';
		const urnPrefixV2 = `urn:cts:CHS:Commentaries.${tenant.subdomain.toUpperCase()}`;
		const urnComment = `${comment.lemmaCitation.work}.${comment.lemmaCitation.textGroup}.
			${comment.lemmaCitation.passageFrom[0]}.${comment.lemmaCitation.passageFrom[1]}
			-${comment.lemmaCitation.passageTo}.${comment.lemmaCitation.passageTo}`;

		const urnCommentId = `${JSON.stringify(comment._id).slice(-COMMENT_ID_LENGTH)}`;
		const ret = {
			v1: `${urnPrefixV1}:${urnComment}.${urnCommentId}`,
			v2: `${urnPrefixV2}:${urnComment}.${urnCommentId}`};
		resolve(ret);
	});
});

const _getAnnotationURN = comment => new Promise(function(resolve, rejected) {
	Books.findOne({ 'chapters.url': comment.bookChapterUrl }).exec().then(function(book) {
		Tenants.findOne({_id: comment.tenantId}).exec().then(function(tenant) {
			const chapter = _.find(book.chapters, c => c.url === comment.bookChapterUrl);
			const urnPrefixV1 = 'urn:cts:CHS.Annotations';
			const urnPrefixV2 = `urn:cts:CHS:Annotations.${tenant.subdomain.toUpperCase()}`;
			const urnBook = `${book.authorURN}.${book.slug}`;
			const urnComment = `${chapter.n}.${comment.paragraphN}`;
			const urnCommentId = `${JSON.stringify(comment._id).slice(-COMMENT_ID_LENGTH)}`;

			const ret = {
				v1: `${urnPrefixV1}:${urnComment}.${urnCommentId}`,
				v2: `${urnPrefixV2}:${urnComment}.${urnCommentId}`
			};
			resolve(ret);
		});
	});
});

const getURN = (comment) => {
	if (comment.isAnnotation) {
		return _getAnnotationURN(comment);
	}
	return _getCommentURN(comment);
};

const prepareNotification = (comment) => {
	const commenterId = comment.commenters[0]._id;
	const userAvatar = Commenters.findOne({_id: commenterId}, {'avatar.src': 1});

	const avatar = userAvatar && userAvatar.avatar ? userAvatar.avatar.src : '/images/default_user.jpg';

	const lines = comment.lineTo !== comment.lineFrom ?
	`lines ${comment.lineFrom} - ${comment.lineTo}` :
	`${comment.lineTo}`;

	const notification = {
		message: `${comment.commenters[0].name} updated a comment on ${comment.work.title} ${comment.subwork.title}, ${lines}`,
		avatar: {src: avatar},
		created: new Date(),
		_id: new ObjectID().toString(),
		slug: commentId
	};

	return notification;
};

const prepareEmailList = (comment) => {
	const notification = prepareNotification(comment);
	const updateUser = { $push: {'subscriptions.notifications': notification} };

	const query = {
		$or: [
			{
				$and:
				[
					{'subscriptions.bookmarks.lineFrom': {$gte: comment.lineFrom}},
					{'subscriptions.bookmarks.lineTo': {$lte: comment.lineTo}}
				]
			},
			{
				'subscriptions.commenters': { $elemMatch: {_id: commenterId} }
			}
		]
	};
	const options = { multi: true };
	const subscribedUsers = Meteor.users.update(query, updateUser, notification, options);

	// send notification email
	const emailListQuery = {
		$and: [
			{
				$or: [
					{
						$and:
						[
							{'subscriptions.bookmarks.work.slug': comment.work.slug},
							{'subscriptions.bookmarks.subwork.slug': comment.subwork.slug},
							{'subscriptions.bookmarks.lineFrom': {$gte: comment.lineFrom}},
							{'subscriptions.bookmarks.lineTo': {$lte: comment.lineTo}}
						]
					},
					{
						'subscriptions.commenters': { $elemMatch: {_id: commenterId} }
					}
				]
			},
			{
				batchNotification: 'immediately'
			},
			{
				emails: { $exists: true }
			}
		]
	};

	// TODO: replace Meteor query here with graphql query
	// const emailList = Meteor.users.find(emailListQuery);
};

const sendUpdateNotification = (comment) => {
	// add notification
	const emailList = prepareEmailList(comment);
	emailList.forEach((subscribedUser) => {

		let username = 'Commentary User';
		if (subscribedUser.profile.name) {
			username = subscribedUser.profile.name;
		} else if (subscribedUser.username) {
			username = subscribedUser.username;
		}

		const from = 'no-reply@ahcip.chs.harvard.edu';
		const to = user.emails[0].address;
		const subject = 'New Notification';
		const text = `
		Dear ${username},

		${comment.commenters[0].name} has updated a comment on the ${comment.work.title}.

		Please review your notification at A Homer Commentary in Progress (http://ahcip.chs.harvard.edu).

		You can change how often you receive these emails in your account settings.
		`;

		Email.send({ from, to, subject, text });
	});
};

export {
	prepareGetCommentsOptions,
	getURN,
	prepareEmailList
};
