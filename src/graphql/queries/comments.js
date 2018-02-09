/**
 * Queries for comments
 */

import {
	GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLNonNull
} from 'graphql';

// types
import CommentType from '../types/comment';
import CtsUrnType from '../../modules/cts/graphql/types/CtsUrn';

// logic
import CommentService from '../logic/Comments/comments';


const commentQueryFields = {
	comments: {
		type: new GraphQLList(CommentType),
		description: 'Get list of all comments by tenant or for a specific work/passage',
		args: {
			queryParam: {
				type: GraphQLString,
			},
			limit: {
				type: GraphQLInt,
			},
			skip: {
				type: GraphQLInt,
			},
			sortRecent: {
				type: GraphQLBoolean
			}
		},
		async resolve (parent, { queryParam, limit, skip, sortRecent }, { token }) {
			const commentService = new CommentService(token);
			const comments = commentService.commentsGet(queryParam, limit, skip, sortRecent);
			return comments;
		},
	},
	commentsMore: {
		type: GraphQLBoolean,
		description: 'Find if there is more comments to take',
		args: {
			queryParam: {
				type: GraphQLString,
			},
			limit: {
				type: GraphQLInt,
			},
			skip: {
				type: GraphQLInt,
			},
		},
		async resolve (parent, { queryParam, limit, skip}, { token }) {
			const commentService = new CommentService(token);
			const comments = await commentService.commentsGetMore(queryParam, limit, skip);
			const tempLimit = limit !== undefined && limit !== null ? limit : 30;
			return comments.length > tempLimit;
		},
	},
	commentsOn: {
		type: new GraphQLList(CommentType),
		description: 'Get list of comments via urn and paginated via skip/limit. Relates a scholion to the passage of text it comments on.',
		args: {
			urn: {
				type: new GraphQLNonNull(CtsUrnType),
			},
			limit: {
				type: GraphQLInt,
			},
			skip: {
				type: GraphQLInt,
			},
		},
		async resolve (parent, { urn, limit, skip }, { token }) {
			const commentService = new CommentService(token);
			const comments = await commentService.commentsGetByURN(urn, limit, skip);
			return comments;
		},
	},
	commentedOnBy: {
		type: new GraphQLList(CommentType),
		description: 'Get list of comments provided at a and paginated via skip/limit. Relates a passage of text to a scholion commenting on it.',
		args: {
			urn: {
				type: new GraphQLNonNull(CtsUrnType),
			},
			commenterIds: {
				type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
			},
			limit: {
				type: GraphQLInt,
			},
			skip: {
				type: GraphQLInt,
			},
		},
		async resolve (parent, { urn, commenterIds, limit, skip }, { token }) {
			const commentService = new CommentService(token);
			const comments = await commentService.commentsGetCommentedOnBy(urn, commenterIds, limit, skip);
			return comments;
		},
	},
	commentsByUrns: {
		type: new GraphQLList(CommentType),
		description: 'Get comments which urns was passed in argument of this query',
		args: {
			urns: {
				type: new GraphQLList(GraphQLString),
				required: true
			},
			limit: {
				type: GraphQLInt
			},
			skip: {
				type: GraphQLInt
			}
		},
		async resolve (parent, { urns, limit, skip }, { token }) {
			const commentService = new CommentService(token);
			const comments = await commentService.commentsGetByUrnsList(urns, limit, skip);
			return comments;
		}
	}
};

export default commentQueryFields;
