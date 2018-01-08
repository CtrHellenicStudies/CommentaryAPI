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
	commentersQuery(tenantId, callback) {
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
			return new Promise(function (resolve, rejected) {
				Commenters.findById(id, function(err, _commenter) {
					if (err) {
						console.log(err);
						rejected(1);
					}

					_commenter = commenter;
					_commenter.save(function(_err, updatedCommenter) {
						if (_err) {
							console.log(_err);
							rejected(1);
						}
						resolve(updatedCommenter);
					});
				});
			});
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
			return Commenters.find({_id: commenterId}).remove().exec();
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
			return new Promise(function(resolve, rejected) {
				commenter.save(function(err, insertedCommenter) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(insertedCommenter);
				});
			});
		}
		throw AuthenticationError();
	}
}
