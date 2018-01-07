/**
 * Queries for discussion comments
 */

import { GraphQLID, GraphQLList } from 'graphql';

// types
import {DiscussionCommentType} from '../types/discussionComment';

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
		resolve: (parent, { tenantId }, {token}) =>
			DiscussionCommentService.discussionCommentsGet(tenantId).then(function(discussionComments) {
				return discussionComments;
			})
	},
};


export default discussionCommentQueryFields;
