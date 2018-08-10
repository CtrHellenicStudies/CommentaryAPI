import { createApolloFetch } from 'apollo-fetch';

import Comments from '../../../models/comment';
import Commenters from '../../../models/commenter';
import Tenants from '../../../models/tenant';
import Books from '../../../models/book';

import dotenvSetup from '../../../dotenv';
import serializeUrn from '../../../modules/cts/lib/serializeUrn';
import logger from '../../../lib/logger';

// TODO: find a better way to query from server
dotenvSetup();
const apolloFetch = createApolloFetch({ uri: process.env.TEXTSERVER_URL || 'http://text.chs.orphe.us/graphql' });

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
			'lemmaCitation.passageFrom.0': 1,
			'lemmaCitation.passageFrom.1': 1,
			nCoveredPassages: -1,
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

const prepareRangeMatcherArgs = (queryPassageFrom, queryPassageTo) => {

	// queryFrom is after commentFrom, 1.7 >= 1.5
	const argsQueryFromAfterCommentFrom = {
		$or: [
			// different chapter
			{
				'lemmaCitation.passageFrom.0': {
					$lt: queryPassageFrom[0],
				}
			},
			// same chapter
			{$and: [
				// commentFrom.chapter <= queryFrom.chapter, 1 <= 1
				{
					'lemmaCitation.passageFrom.0': {
						$lte: queryPassageFrom[0],
					}
				},
				// AND
				// commnetFrom.passage <= queryFrom.passage, 5 <= 7
				{
					'lemmaCitation.passageFrom.1': {
						$lte: queryPassageFrom[1],
					}
				},
			]},
		]
	};

	// queryFrom is before commentTo, 1.7 <= 2.5
	const argsQueryFromBeforeCommentTo = {
		$or: [
			// different chapter
			{
				'lemmaCitation.passageTo.0': {
					$gt: queryPassageFrom[0],
				}
			},
			// same chapter
			{$and: [
				// commentTo.chapter >= queryFrom.chapter, 2 >= 1
				{
					'lemmaCitation.passageTo.0': {
						$gte: queryPassageFrom[0],
					}
				},
				// AND 
				// commnetTo.passage >= queryFrom.passage
				{
					'lemmaCitation.passageTo.1': {
						$gte: queryPassageFrom[1],
					}
				},
			]},
		]
	};

	// queryFrom within commentFrom and To, 1.7 <= 1.5-2.5
	const argsQueryFromWithinCommentFromAndTo = {
		$and: [argsQueryFromAfterCommentFrom, argsQueryFromBeforeCommentTo]
	};

	// queryTo is after commentFrom
	const argsQueryToAfterCommentFrom = {
		$or: [
			// different chapter
			{
				'lemmaCitation.passageFrom.0': {
					$lt: queryPassageTo[0],
				}
			},
			// same chapter
			{$and: [
				// commentFrom.chapter <= queryTo.chapter
				{
					'lemmaCitation.passageFrom.0': {
						$lte: queryPassageTo[0],
					}
				},
				// AND
				// commnetFrom.passage <= queryTo.passage
				{
					'lemmaCitation.passageFrom.1': {
						$lte: queryPassageTo[1],
					}
				},
			]}
		]
	};

	// queryTo is before commentTo
	const argsQueryToBeforeCommentTo = {
		$or: [
			// different chapter
			{
				'lemmaCitation.passageTo.0': {
					$gt: queryPassageTo[0],
				}
			},
			// same chapter
			{$and: [
				// commentTo.chapter >= queryTo.chapter 
				{
					'lemmaCitation.passageTo.0': {
						$gte: queryPassageTo[0],
					}
				},
				// AND 
				// commnetTo.passage >= queryTo.passage
				{
					'lemmaCitation.passageTo.1': {
						$gte: queryPassageTo[1],
					}
				},
			]}
		]
	};

	// queryTo within commentFrom and To
	const argsQueryToWithinCommentFromAndTo = {
		$and: [argsQueryToAfterCommentFrom, argsQueryToBeforeCommentTo]
	};

	// either queryFrom or queryTo lies within commentFrom and To range
	return [argsQueryFromWithinCommentFromAndTo, argsQueryToWithinCommentFromAndTo];

};

const fetchPassagesByURN = async (textNodesUrn) => {

	const res = await apolloFetch({
		query: `
			query textNodesQuery($textNodesUrn: CtsUrn!) {
				textNodes(
				urn: $textNodesUrn
				) {
					id
					text
					location
					urn
					index
				}
			}
			`,
		variables: {
			textNodesUrn,
		},
	});

	return res.data.textNodes;
};

const calculateNumberOfCoveredPassages = async (comment) => {
	let nCoveredPassages = 1; // default 
	// passageFrom and To are within same chapter
	if (comment.lemmaCitation.passageTo && comment.lemmaCitation.passageTo[0] === comment.lemmaCitation.passageFrom[0]) {
		nCoveredPassages += comment.lemmaCitation.passageTo[1] - comment.lemmaCitation.passageFrom[1];
	} else { // passageFrom and To spans over chapters
		try { // try to get covered text nodes from textserver
			const textNodesUrn = serializeUrn(comment.lemmaCitation);
			const coveredTextNodes = await fetchPassagesByURN(textNodesUrn);
			nCoveredPassages = coveredTextNodes.length;
			comment.nCoveredPassagesEstimated = false;
		} catch (e) {
			// fallback to a default
			const averagePassagePerChapter = 300;
			nCoveredPassages = 
				Math.max(0, (averagePassagePerChapter - comment.lemmaCitation.passageFrom[1]))
				+ ((comment.lemmaCitation.passageTo[0] - comment.lemmaCitation.passageFrom[0]) * averagePassagePerChapter)
				+ comment.lemmaCitation.passageTo[1];
			comment.nCoveredPassagesEstimated = true; // do db migration to correct nCoveredPassage on comments with this
			logger.error('Failed to fetch textNodes from Textserver', e);
		}
	}
	comment.nCoveredPassages = nCoveredPassages;
	return comment;
};

export {
	prepareGetCommentsOptions,
	getURN,
	prepareEmailList,
	prepareRangeMatcherArgs,
	calculateNumberOfCoveredPassages
};
