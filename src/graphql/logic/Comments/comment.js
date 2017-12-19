import mongoose from 'mongoose';

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

	/**
	 * Remove a comment
	 * @param {string} _id - comment id to remove
	 * @returns {object} promise
	 */
	commentRemove(_id) {
		if (this.userIsAdmin) {
			return Comments.find({_id: _id}).remove().exec();
		}
		throw AuthenticationError();
	}
	/**
	 * Add a comment
	 * @param {object} comment - comment to insert
	 * @returns {object} promise
	 */
	commentInsert(comment) {
		if (this.userIsNobody) {
			throw AuthenticationError();
		}
		let commentId;
		let ret;
		comment._id = new mongoose.mongo.ObjectId();
		return new Promise(function(resolve, rejection) {
			getURN(comment).then(function(urns) {
				comment.urn = urns;
				Comments.create(comment, function(err, inserted) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(inserted);
				});
			});
		});
	}
	/**
	 * Update comment
	 * @param {String} id - id of updating comment
	 * @param {object} comment - comment updated version
	 * @returns {object} promise
	 */
	commentUpdate(id, comment) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejected) {
				Comments.update({_id: id}, comment, function(err, updated) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(updated);
				});
			});
		}
		throw AuthenticationError();
	}
	/**
	 * Add revision to comment
	 * @param {String} commentId - id of comment of revision
	 * @param {object} revision - added revision
	 * @returns {object} promise
	 */
	addRevision(commentId, revision) {
	
		if (this.userIsNobody) {
			throw AuthenticationError();
		}
		const comment = Comments.findOne({ _id: commentId });
		const commenters = Commenters.find().fetch();
	
		let allowedToEdit = false;
		this.user.canEditCommenters.forEach((commenterId) => {
			comment.commenters.forEach((commenter) => {
				commenters.forEach((_commenter) => {
					if (
							commenter.slug === _commenter.slug
						&& _commenter._id === commenterId
					) {
						allowedToEdit = true;
					}
				});
			});
		});
		if (!allowedToEdit) {
			throw AuthenticationError();
		}
		const revisionId = Random.id();
		revision._id = revisionId;
		try {
			Comments.update({
				_id: commentId,
			}, {
				$push: {
					revisions: {...revision},
				},
			});
		} catch (err) {
			throw new Error(`Error adding revision to comment: ${err}`);
		}
		return revisionId;
	}
	/**
	 * Remove revision
	 * @param {String} commentId - id of comment of revision
	 * @param {object} revision - revision to remove
	 * @returns {object} promise
	 */
	removeRevision(commentId, revision) {
		
		if (this.userIsNobody) {
			throw AuthenticationError();
		}

		const revisionId = Random.id();
		revision._id = revisionId;
	
		try {
			Comments.update({
				_id: commentId,
			}, {
				$pull: {
					revisions: revision,
				},
			}, {
				getAutoValues: false,
			});
		} catch (err) {
			throw new Error(`Error adding revision to comment: ${err}`);
		}
		return revisionId;
	}
	
}
