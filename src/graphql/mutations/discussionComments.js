/**
 * Mutations for discussion comments
 */

import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

// types
import { DiscussionCommentType, DiscussionCommentInputType} from '../types/discussionComment';
import RemoveType from '../types/remove';

// logic
import DiscussionCommentService from '../logic/DiscussionComments/discussionComments';

const discussionCommentsMutationFields = {
	discussionCommentUpdateStatus: {
		type: DiscussionCommentType,
		description: 'Update a discussion comment status',
		args: {
			discussionCommentId: {
				type: new GraphQLNonNull(GraphQLString)
			},
			discussionCommentStatus: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {discussionCommentId, discussionCommentStatus}, {token}) => {
			const discussionCommentsService = new DiscussionCommentService({token});
			return discussionCommentsService.discussionCommentUpdateStatus(discussionCommentId, discussionCommentStatus);
		}
	},
	discussionCommentUpdate: {
		type: DiscussionCommentType,
		description: 'Update a discussion comment content',
		args: {
			discussionCommentId: {
				type: new GraphQLNonNull(GraphQLString)
			},
			discussionContent: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {discussionCommentId, discussionContent}, {token}) => {
			const discussionCommentsService = new DiscussionCommentService({token});
			return discussionCommentsService.discussionCommentUpdate(discussionCommentId, discussionContent);
		}
	},
	discussionCommentRemove: {
		type: RemoveType,
		description: 'Remove a single discussionComment',
		args: {
			discussionCommentId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {discussionCommentId}, {token}) => {
			const discussionCommentsService = new TenantsService({token});
			return discussionCommentsService.discussionCommentRemove(discussionCommentId);
		}
	},
	discussionCommentReport: {
		type: DiscussionCommentType,
		description: 'Report discussionComment',
		args: {
			discussionCommentId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {discussionCommentId}, {token}) => {
			const discussionCommentsService = new DiscussionCommentService({token});
			return discussionCommentsService.discussionCommentReport(discussionCommentId);
		}
	},
	discussionCommentInsert: {
		type: DiscussionCommentType,
		description: 'Report discussionComment',
		args: {
			commentId: {
				type: new GraphQLNonNull(GraphQLString)
			},
			discussionContent: {
				type: new GraphQLNonNull(GraphQLString)
			},
			tenantId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {commentId, discussionContent, tenantId}, {token}) => {
			const discussionCommentsService = new DiscussionCommentService({token});
			return discussionCommentsService.discussionCommentInsert(commentId, discussionContent, tenantId);
		}
	},
	discussionCommentUnreport: {
		type: DiscussionCommentType,
		description: 'Undo your report',
		args: {
			discussionCommentId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {discussionCommentId}, {token}) => {
			const discussionCommentsService = new DiscussionCommentService({token});
			return discussionCommentsService.discussionCommentUnreport(discussionCommentId);
		}
	},
	discussionCommentUpvote: {
		type: DiscussionCommentType,
		description: 'Vote for this discussionComment',
		args: {
			discussionCommentId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {discussionCommentId}, {token}) => {
			const discussionCommentsService = new DiscussionCommentService({token});
			return discussionCommentsService.discussionCommentUpvote(discussionCommentId);
		}
	}
};

export default discussionCommentsMutationFields;
