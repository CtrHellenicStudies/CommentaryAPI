import Commenters from '../../../models/commenters';
// errors
import { AuthenticationError } from '../../errors/index';
import PermissionsService from '../PermissionsService';

/**
 * Logic-layer service for dealing with commenters
 */
export default class CommentService extends PermissionsService {

	/**
	 * Get commenters for the supplied _id and tenantId
	 * @param {string} tenantId - id for current tenant
	 * @returns {Object[]} array of commenters
	 */
	static commentersQuery(tenantId, callback) {
		const args = {};
		if (tenantId) {
			args.tenantId = tenantId;
		}
		const promise = Commenters.find(args).sort({slug: 1}).exec();
		return promise;
	}

	/**
	 * Update a commenter
	 * @param {string} _id - commenter id
	 * @param {Object} commenter - the updated commenter record
	 * @returns {boolean} the mongo orm update response
	 */
	commenterUpdate(_id, commenter) {
		if (this.userIsAdmin) {
			const promise = Commenters.update(_id, {$set: commenter}).exec();
			return promise;
		}
		throw AuthenticationError();
	}

	/**
	 * Remove a commenter
	 * @param {string} commenterId - id of the commenter to remove
	 * @returns {boolean} the mongo orm remove response
	 */
	commenterRemove(commenterId) {
		if (this.userIsAdmin) {
			const promise = Commenters.remove({_id: commenterId});
			return promise;
		}
		throw AuthenticationError();
	}

	/**
	 * Create a new commenter
	 * @param {Object} commenter - the new commenter candidate 
	 * @returns {Object} the newly created commenter record
	 */
	commenterInsert(commenter) {
		if (this.userIsAdmin) {
			const commenterId = Commenters.insert({...commenter});
			const promise = Commenters.findOne(commenterId);
			return promise;
		}
		throw AuthenticationError();
	}
}