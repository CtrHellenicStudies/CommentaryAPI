/**
 * Mutations for comments
 */

import { GraphQLString, GraphQLNonNull } from 'graphql';

// types
import CommentType, { CommentInputType } from '../types/comment';
import { RevisionInputType } from '../types/revision';
import RemoveType from '../types/remove';

// logic
import CommentService from '../logic/comments/comment';


const commentMutationFields = {
	commentInsert: {
		type: CommentType,
		description: 'Create new comment',
		args: {
			comment: {
				type: new GraphQLNonNull(CommentInputType)
			}
		},
		async resolve (parent, {comment}, { token }) {
			const commentService = new CommentService({ token });
			return commentService.commentInsert(comment).then(function(_comment) {
				return _comment;
			});
		}
	},
	commentUpdate: {
		type: CommentType,
		description: 'Update comment',
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLString)
			},
			comment: {
				type: new GraphQLNonNull(CommentInputType)
			}
		},
		async resolve (parent, {id, comment}, { token }) {
			const commentService = new CommentService({ token });
			return commentService.commentUpdate(id, comment).then(function(_comment) {
				return _comment._id;
			});
		}
	},
	commentRemove: {
		type: RemoveType,
		description: 'Remove a single comment',
		args: {
			commentId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve (parent, {commentId}, { token }) {
			const commentService = new CommentService({ token });
			return commentService.commentRemove(commentId).then(function(_comment) {
				return _comment._id;
			});
		}
	},
	commentInsertRevision: {
		type: CommentType,
		description: 'Add new revision',
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLString)
			},
			revision: {
				type: new GraphQLNonNull(RevisionInputType)
			}
		},
		async resolve (parent, {id, revision}, { token }) {
			const commentService = new CommentService({ token });
			return commentService.addRevision(id, revision).then(function(_comment) {
				return _comment._id;
			});
		}
	},
	commentRemoveRevision: {
		type: RemoveType,
		description: 'Remove a single comment',
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve (parent, {id}, { token }) {
			const commentService = new CommentService({ token });
			return commentService.removeRevision(id).then(function(_comment) {
				return _comment._id;
			});
		}
	}
};



export default commentMutationFields;
