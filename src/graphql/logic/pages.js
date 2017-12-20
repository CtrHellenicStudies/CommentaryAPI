import Pages from '../../models/pages';
import PermissionsService from './PermissionsService';
import { AuthenticationError } from '../errors/index';

/**
 * Logic-layer service for dealing with pages
 */
export default class PageService extends PermissionsService {

	/**
	 * Get pages
	 * @param {string} _id - id of page
	 * @param {string} tenantId - id of current tenant
	 * @returns {object} promise
	 */
	static pagesGet(_id, tenantId) {
		const args = {};
		if (tenantId) {
			args.tenantId = tenantId;
		}
		if (_id) {
			args._id = _id;
		}
		return Pages.find(args).exec();
	}

	/**
	 * Update a page
	 * @param {string} _id - id of page
	 * @param {Object} page - page params to update
	 * @returns {object} promise
	 */
	pageUpdate(_id, page) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejected) {
				Pages.update({_id: _id}, page, function(err, updated) {
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
	 * Remove a page
	 * @param {string} pageId - id of page to remove
	 * @returns {object} promise
	 */
	pageRemove(pageId) {
		if (this.userIsAdmin) {
			return Pages.find({_id: pageId}).remove().exec();
		}
		throw new AuthenticationError();
	}

	/**
	 * Create a new page
	 * @param {Object} page - new page candidate
	 * @returns {object} promise
	 */
	pageCreate(page) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejection) {
				Pages.create(page, function(err, inserted) {
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
}
