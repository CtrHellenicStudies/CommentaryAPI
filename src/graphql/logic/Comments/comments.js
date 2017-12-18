import Comments from '../../../models/comments';
import Commenters from '../../../models/commenters';
// errors
import { AuthenticationError } from '../../errors/index';

import PermissionsService from '../PermissionsService';

import { prepareGetCommentsOptions, getURN } from './helper';

/**
 * Logic-layer service for dealing with comments
 */
export default class CommentService extends PermissionsService {

	// TODO resolve options
	/**
	 * Get comments for admin interface
	 * @param {string} queryParam - query describing comments to get
	 * @param {number} limit - mongo orm limit
	 * @param {number} skip - mongo orm skip
	 * @param {boolean} sortRecent - if should sort in the recent sequence
	 * @returns {Object[]} array of comments
	 */
	static commentsGet(queryParam, limit, skip, sortRecent) {

		const options = prepareGetCommentsOptions(limit, skip);
		let query;
		if (queryParam === null || queryParam === undefined) {
			query = {};
		} else {
			query = JSON.parse(queryParam);
		}
		query.isAnnotation = {$ne: true};
		return new Promise(function(resolve, reject) {
			Comments.find(query)
			.limit(options.limit)
			.sort(options.sort)
			.skip(options.skip)
			.exec()
			.then(function(comments) {
				const promises = [];
				for (let i = 0; i < comments.length; i += 1) {
					const queryCommenters = { $or: [] };
					for (let j = 0; j < comments[i].commenters.length; j += 1) {
						queryCommenters.$or.push({_id: comments[i].commenters[j]._id});
					}
					promises.push(new Promise(function(resolveNew, rejectNew) {
						const currentComment = comments[i];
						Commenters.find(queryCommenters).exec().then(function(commenters) {
							currentComment.commenters = commenters;
							resolveNew(1);
						});
					}));
				}
				Promise.all(promises).then(function() {
					resolve(comments);
				});
			});
		});
	}
		/**
	 * Get comments for admin interface
	 * @param {string} queryParam - query describing comments to get
	 * @param {number} limit - mongo orm limit
	 * @param {number} skip - mongo orm skip
	 * @returns {boolean} is there any other comments which are possible to get
	 */
	static commentsGetMore(queryParam, limit, skip) {
		if (!queryParam && !limit && !skip) {
			return Comments.find().limit(1);
		}
		try { 
			const MAX_LIMIT = 1000;
			// const args = prepareGetCommentsArgs(workSlug, subworkN, tenantId);
			const options = prepareGetCommentsOptions(MAX_LIMIT, skip);
			let query;
			if (queryParam === null || queryParam === undefined) {
				query = {};
			} else {
				query = JSON.parse(queryParam);
			}
			return Comments.find(query)
			.limit(options.limit + 1)
			.sort(options.sort)
			.skip(options.skip)
			.exec();
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 * Get comments via a start URN and end URN
	 * @param {string} urnStart - urn start range
	 * @param {string} urnEnd - urn end range
	 * @param {number} limit - mongo orm limit
	 * @param {number} skip - mongo orm skip
	 * @returns {Object[]} array of comments
	 */
	static commentsGetURN(urnStart, urnEnd, limit = 20, skip = 0) {
		const args = {};
		const options = prepareGetCommentsOptions(skip, limit);

		return Comments.find(args).limit(options.limit).sort(options.sort).exec();
	}

	/**
	 * Remove a comment
	 * @param {string} _id - comment id to remove
	 * @returns {boolean} result of mongo orm remove
	 */
	commentRemove(_id) {
		if (this.userIsAdmin) {
			return Comments.remove({ _id });
		}
		throw AuthenticationError();
	}
	/**
	 * Add a comment
	 * @param {object} comment - comment to insert
	 */
	commentInsert(comment) {
		if (this.userIsNobody) {
			throw AuthenticationError();
		}
		let commentId;
		let ret;
		try {
			commentId = Comments.insert({...comment});
			ret = Comments.findOne({_id: commentId});
			ret.urn = getURN(ret);
			Comments.update({_id: commentId}, {$set: {urn: ret.urn}});
		} catch (e) {
			console.log(e);
			return '';
		}
		return Comments.findOne({_id: commentId});
	}
}
