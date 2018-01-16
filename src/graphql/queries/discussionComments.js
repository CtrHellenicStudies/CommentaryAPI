/**
 * Queries for discussion comments
 */

import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { DiscussionCommentType } from '../types/discussionComment';

// logic
import DiscussionCommentService from '../logic/DiscussionComments/discussionComments';

const discussionCommentQueryFields = {
	discussionComments: {
		type: new GraphQLList(DiscussionCommentType),
		description: 'Get list of all discussion comments',
		args: {
			tenantId: {
				type: GraphQLID,
			},
			commentId: {
				type: GraphQLString
			},
			userId: {
				type: GraphQLString
			}
		},
		async resolve (parent, { tenantId, commentId, userId }, { token }) {
			const dicussionCommentService = new DiscussionCommentService(token);
			const discussionComments = await dicussionCommentService.discussionCommentsGet(tenantId, commentId, userId);
			return discussionComments;
		},
	},
};


export default discussionCommentQueryFields;
