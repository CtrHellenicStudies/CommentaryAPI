import Works from '../../../models/works';
import PermissionsService from '../PermissionsService';
import { AuthenticationError } from '../../errors/index';

/**
 * Logic-layer service for dealing with works
 */
export default class WorksService extends PermissionsService {

	/**
	 * Rewrite subworks for modifiying works
	 * @param {(Object|Array)} subworks
	 * @returns {object} promise
	 */
	rewriteSubworks(subworks) {
		const newSubworks = [];
		subworks.map(singleSubwork =>
			newSubworks.push({
				title: singleSubwork.title,
				slug: singleSubwork.slug,
				n: singleSubwork.n
			})
		);
		return newSubworks;
	}
	/**
	 * Create a work
	 * @param {Object} work - candidate work to create
	 * @returns {Object} promise
	 */
	workInsert(work) {
		if (!this.userIsNobody) {
			const newWork = work;
			newWork.subworks = this.rewriteSubworks(work.subworks);
			return new Promise(function(resolve, rejection) {
				Works.create(newWork, function(err, inserted) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(inserted);
				});
			});
		}
		throw new AuthenticationError();
	}
	/**
	 * Update a work
	 * @param {string} _id - id of work
	 * @param {Object} work - work to update
	 * @returns {boolean} result from mongo orm update
	 */
	workUpdate(_id, work) {
		if (!this.userIsNobody) {
			const newWork = work;
			newWork.subworks = this.rewriteSubworks(work.subworks);
			return new Promise(function(resolve, rejected) {
				Works.update({_id: _id}, newWork, function(err, updated) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(updated);
				});
			});
		}
		throw new AuthenticationError();
	}
	/**
	 * Get works
	 * @param {string} _id - id of work
	 * @param {string} tenantId - id of current tenant
	 * @returns {Object[]} array of works
	 */
	worksGet(_id, tenantId) {
		const args = {};

		if (tenantId) {
			args.tenantId = tenantId;
		}

		if (_id) {
			args._id = _id;
		}
		const promise = Works.find(args).sort({slug: 1}).exec();
		return promise;
	}
	/**
	 * Remove a work
	 * @param {string} _id - id of work
	 * @returns {boolean} result from mongo orm remove
	 */
	workRemove(_id) {
		if (!this.userIsNobody) {
			return Works.find({ _id }).remove().exec();
		}
		throw new AuthenticationError();
	}
}
