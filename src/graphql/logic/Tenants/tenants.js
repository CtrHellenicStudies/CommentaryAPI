import Tenants from '../../../models/tenants';
import PermissionsService from '../PermissionsService';
import { AuthenticationError } from '../../errors/index';

/**
 * Logic-layer service for dealing with tenants
 */
export default class TenantsService extends PermissionsService {

	/**
	 * Get tenants
	 * @param {string} _id - id of tenant
	 * @returns {Object[]} array of tenants
	 */
	static tenantsGet(_id) {
		
		const args = {};

		if (_id) {
			args._id = _id;
		}

		return Tenants.find(args).exec();
	}
	/**
	 * Get a tenant by the supplied subdomain
	 * @param {string} subdomain - id of tenant
	 * @returns {Object} found tenant record
	 */
	static tenantBySubdomainGet(subdomain) {
		return Tenants.findOne({
			subdomain: subdomain,
		}).exec();
	}
	/**
	 * Update a tenant
	 * @param {string} _id - id of tenant
	 * @param {Object} tenant - tenant params to update
	 * @returns {Object} tenant record that was found
	 */
	tenantUpdate(_id, tenant) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejected) {
				Tenants.update({_id: _id}, tenant, function(err, updated) {
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
	 * Remove a tenant
	 * @param {string} tenantId - id of tenant
	 * @returns {boolean} result from mongo orm remove
	 */
	tenantRemove(tenantId) {
		if (this.userIsAdmin) {
			return Tenants.find({_id: tenantId}).remove().exec();
		}
		throw new AuthenticationError();
	}
	/**
	 * Create a tenant
	 * @param {Object} tenant - candidate tenant to create
	 * @returns {Object} newly created tenant
	 */
	tenantCreate(tenant) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejection) {
				Tenants.create(tenant, function(err, inserted) {
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
