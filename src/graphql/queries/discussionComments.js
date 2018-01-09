/**
 * Queries for discussion comments
 */

import { GraphQLID, GraphQLList } from 'graphql';

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
		},
		async resolve (parent, { tenantId }, { token }) {
			const dicussionCommentService = new DiscussionCommentService(token);
			const discussionComments = await dicussionCommentService.discussionCommentsGet(tenantId);
			return discussionComments;
		},
	},
};


export default discussionCommentQueryFields;
