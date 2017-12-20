/**
 * Queries for comments
 */

import { GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';

// types
import CommentType from '../types/models/comment';

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
		resolve(parent, { queryParam, limit, skip, sortRecent}, {token}) {
			return CommentService.commentsGet(queryParam, limit, skip, sortRecent).then(function(comments) {
				return comments;
			});
		}
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
		resolve: (parent, { queryParam, limit, skip}, {token}) => 
			CommentService.commentsGetMore(queryParam, limit, skip).then(function(comments) {
				const tempLimit = limit !== undefined && limit !== null ? limit : 30;
				return comments.length > tempLimit;
			})
	},
	commentsOn: {
		type: new GraphQLList(CommentType),
		description: 'Get list of comments provided at least a startURN and paginated via skip/limit. Relates a scholion to the passage of text it comments on.',
		args: {
			urnStart: {
				type: GraphQLString,
				required: true,
			},
			urnEnd: {
				type: GraphQLString,
			},
			limit: {
				type: GraphQLInt,
			},
			skip: {
				type: GraphQLInt,
			},
		},
		resolve: (parent, { urnStart, urnEnd, limit, skip }, { token }) =>
			CommentService.commentsGetURN(urnStart, urnEnd, limit, skip).then(function(comments) {
				comments.map((comment) => {
					try {
						comment.urn = JSON.parse(comment.urn);
					} catch (e) {
						console.log(e);
					}
					return comment;
				});
				return comments;
			})
	},
	commentedOnBy: {
		type: new GraphQLList(CommentType),
		description: 'Get list of comments provided at least a startURN and paginated via skip/limit. Relates a passage of text to a scholion commenting on it.',
		args: {
			urnStart: {
				type: GraphQLString,
				required: true,
			},
			urnEnd: {
				type: GraphQLString,
			},
			limit: {
				type: GraphQLInt,
			},
			skip: {
				type: GraphQLInt,
			},
		},
		resolve: (parent, { urnStart, urnEnd, limit, skip }, { token }) =>
			CommentService.commentsGetURN(urnStart, urnEnd, limit, skip).then(function(comment) {
				return comment;
			})
	},
};

export default commentQueryFields;
