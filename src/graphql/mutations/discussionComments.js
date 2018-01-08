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
		async resolve (parent, {discussionCommentId, discussionCommentStatus}, { token }) {
			const discussionCommentService = new DiscussionCommentService({ token });
			return discussionCommentService.discussionCommentUpdateStatus(discussionCommentId, discussionCommentStatus);
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
		async resolve (parent, {discussionCommentId, discussionContent}, { token }) {
			const discussionCommentService = new DiscussionCommentService({ token });
			return discussionCommentService.discussionCommentUpdate(discussionCommentId, discussionContent);
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
		async resolve (parent, {discussionCommentId}, { token }) {
			const discussionCommentService = new TenantService({ token });
			return discussionCommentService.discussionCommentRemove(discussionCommentId);
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
		async resolve (parent, {discussionCommentId}, { token }) {
			const discussionCommentService = new DiscussionCommentService({ token });
			return discussionCommentService.discussionCommentReport(discussionCommentId);
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
		async resolve (parent, {commentId, discussionContent, tenantId}, { token }) {
			const discussionCommentService = new DiscussionCommentService({ token });
			return discussionCommentService.discussionCommentInsert(commentId, discussionContent, tenantId);
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
		async resolve (parent, {discussionCommentId}, { token }) {
			const discussionCommentService = new DiscussionCommentService({ token });
			return discussionCommentService.discussionCommentUnreport(discussionCommentId);
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
		async resolve (parent, {discussionCommentId}, { token }) {
			const discussionCommentService = new DiscussionCommentService({ token });
			return discussionCommentService.discussionCommentUpvote(discussionCommentId);
		}
	}
};

export default discussionCommentsMutationFields;
