import ReferenceWorks from '../../../models/referenceWork';
import PermissionsService from '../PermissionsService';
import { AuthenticationError } from '../../errors';

/**
 * Logic-layer service for dealing with reference works
 */
export default class ReferenceWorksService extends PermissionsService {
	/**
	 * Get reference work
	 * @param {string} id - id of reference work
	 * @param {string} tenantId - id of current tenant
	 * @returns {Object}
	 */
	async getReferenceWork(id, slug, tenantId) {
		const args = {};

		if (tenantId) {
			args.tenantId = tenantId;
		}

		if (id) {
			args._id = id;
		}

		if (slug) {
			args.slug = slug;
		}

		const referenceWork = await ReferenceWorks.findOne(args);
		return referenceWork;
	}

	/**
	 * Get reference works
	 * @param {string} tenantId - id of current tenant
	 * @returns {Object[]} array of reference work documents
	 */
	async getReferenceWorks(tenantId) {
		const args = {};

		if (tenantId) {
			args.tenantId = tenantId;
		}

		const referenceWorks = await ReferenceWorks.find(args).sort({ slug: 1 });
		return referenceWorks;
	}

	/**
	 * Remove a reference work
	 * @param {string} referenceWorkId - id of reference work
	 * @returns {object} promise
	 */
	referenceWorkRemove(referenceWorkId) {
		if (this.userIsAdmin) {
			return ReferenceWorks.findOne({_id: referenceWorkId}).remove().exec();
		}
		return new AuthenticationError();
	}
	/**
	 * Update a reference work
	 * @param {string} referenceWorkId - id of reference work
	 * @param {Object} referenceWork - reference work to update
	 * @returns {object} promise
	 */
	referenceWorkUpdate(referenceWorkId, referenceWork) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejected) {
				ReferenceWorks.update({_id: referenceWorkId}, referenceWork, function(err, updated) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(updated);
				});
			});
		}
		return new AuthenticationError();
	}
	/**
	 * Create a reference work
	 * @param {Object} referenceWork - candidate reference work to create
	 * @returns {Object} promis
	 */
	referenceWorkCreate(referenceWork) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejected) {
				ReferenceWorks.create(referenceWork, function(err, inserted) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(insertedKeyword);
				});
			});
		}
		throw new AuthenticationError();
	}
}
