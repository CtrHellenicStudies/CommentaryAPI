import Comments from '../../../models/comment';
import Commenters from '../../../models/commenter';
import ReferenceWorks from '../../../models/referenceWork';

// errors
import { AuthenticationError } from '../../errors';

import PermissionsService from '../PermissionsService';

import { prepareGetCommentsOptions, getURN, prepareRangeMatcherArgs } from './helper';
import { parseValueUrn } from '../../../modules/cts/lib/parseUrn';

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
	async commentsGet(queryParam, limit, skip, sortRecent) {

		// prepare options for comments query
		const options = prepareGetCommentsOptions(limit, skip);

		// parse query for database from query params
		let query;
		if (queryParam === null || queryParam === undefined) {
			query = {};
		} else {
			query = JSON.parse(queryParam);
		}

		// only query comments that are not annotations
		query.isAnnotation = { $ne: true };

		// query comments
		const comments = await Comments.find(query)
			.limit(options.limit)
			.sort(options.sort)
			.skip(options.skip);

		// Do subqueries for all found comments
		for (let i = 0; i < comments.length; i += 1) {
			const queryCommenters = { };
			const queryReferenceWorks = { };

			// subquery for commenters
			if (comments[i].commenters.length) {
				queryCommenters.$or = [];
			}
			for (let j = 0; j < comments[i].commenters.length; j += 1) {
				queryCommenters.$or.push({slug: comments[i].commenters[j].slug});
			}

			// subquery for reference works
			if (comments[i].referenceWorks.length) {
				queryReferenceWorks.$or = [];
			}
			for (let j = 0; j < comments[i].referenceWorks.length; j += 1) {
				queryReferenceWorks.$or.push({_id: comments[i].referenceWorks[j].referenceWorkId});
			}

			// set commenters on current comment
			const commenters = await Commenters.find(queryCommenters);
			comments[i].commenters = commenters;

			// set referenceWorks on current comment
			const referenceWorks = await ReferenceWorks.find(queryReferenceWorks);
			comments[i].referenceWorks = referenceWorks;
		}

		return comments;
	}

	/**
	 *
	 * @param {array} urns - array of urns
	 * @param {number} limit - limit of records
	 * @param {number} skip - skip records
	 */
	commentsGetByUrnsList(urns, limit, skip) {
		const args = {};
		args.$or = [];
		for (let i = 0; i < urns.length; i += 1) {
			args.$or.push({'urn.v1': urns[i]});
			args.$or.push({'urn.v2': urns[i]});
		}
		const options = prepareGetCommentsOptions(limit, skip);
		return Comments.find(args).limit(options.limit).skip(options.skip);
	}

	/**
	 * Get comments for admin interface
	 * @param {string} queryParam - query describing comments to get
	 * @param {number} limit - mongo orm limit
	 * @param {number} skip - mongo orm skip
	 * @returns {boolean} is there any other comments which are possible to get
	 */
	commentsGetMore(queryParam, limit, skip) {
		if (!queryParam && !limit && !skip) {
			return Comments.find().limit(1).exec();
		}
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
	}

	/**
	 * Get comments via an input URN
	 * @param {string} urn - urn start range
	 * @param {number} limit - mongo orm limit
	 * @param {number} skip - mongo orm skip
	 * @returns {Object[]} array of comments
	 */
	async commentsGetByURN(urn, limit = 20, skip = 0) {
		// parse input urn
		const parsedUrn = parseValueUrn(urn);

		// set comment query args
		const args = {
			'lemmaCitation.ctsNamespace': parsedUrn.ctsNamespace,
			'lemmaCitation.textGroup': parsedUrn.textGroup,
			'lemmaCitation.work': parsedUrn.work,
		};

		// parse query options (sort, etc)
		const options = prepareGetCommentsOptions(skip, limit);

		// set comment query passage range
		if (parsedUrn.passage.length === 1) { // single passage
			parsedUrn.passage[1] = parsedUrn.passage[0];
		}

		// prepare range matcher
		args.$or = prepareRangeMatcherArgs(parsedUrn.passage[0], parsedUrn.passage[1]);

		// return comments
		return Comments.find(args).limit(options.limit).sort(options.sort).exec();
	}

	/**
	 * Get comments via an input URN and commenterId
	 * @param {string} urn - urn start range
	 * @param {string} commenterId - commenterId
	 * @param {number} limit - mongo orm limit
	 * @param {number} skip - mongo orm skip
	 * @returns {Object[]} array of comments
	 */
	async commentsGetCommentedOnBy(urn, commenterIds, limit = 20, skip = 0) {
		// parse input urn
		const parsedUrn = parseValueUrn(urn);

		// set comment query args
		const args = {
			'lemmaCitation.ctsNamespace': parsedUrn.ctsNamespace,
			'lemmaCitation.textGroup': parsedUrn.textGroup,
			'lemmaCitation.work': parsedUrn.work,
		};

		// set comment query passage range
		if (parsedUrn.passage.length === 1) { // single passage
			parsedUrn.passage[1] = parsedUrn.passage[0];
		}

		// set the commenter id of input commenterIds
		args['commenters._id'] = commenterIds;

		// prepare range matcher
		args.$or = prepareRangeMatcherArgs(parsedUrn.passage[0], parsedUrn.passage[1]);

		// parse query options (sort, etc)
		const options = prepareGetCommentsOptions(skip, limit);

		// return comments
		return Comments.find(args).limit(options.limit).sort(options.sort).exec();
	}
}
