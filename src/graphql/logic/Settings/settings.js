import Settings from '../../../models/settings';
import PermissionsService from '../PermissionsService';
import { AuthenticationError } from '../../errors/index';

/**
 * Logic-layer service for dealing with settings
 */
export default class SettingsService extends PermissionsService {

	/**
	 * Get settings
	 * @param {string} _id - id of settings
	 * @param {string} tenantId - id of current tenant
	 * @returns {Object[]} array of settings
	 */
	settingsGet(_id, tenantId) {

		const args = {};

		if (tenantId) {
			args.tenantId = tenantId;
		}

		if (_id) {
			args._id = _id;
		}
		const promise = Settings.find(args).exec();
		return promise;
	}
	/**
	 * Update a settings
	 * @param {string} _id - id of settings
	 * @param {Object} settings - setting to update
	 * @returns {boolean} result from mongo orm update
	 */
	settingsUpdate(_id, settings) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejected) {
				Settings.update({_id: _id}, settings, function(err, updated) {
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
	 * Remove a settings
	 * @param {string} settingsId - id of settings
	 * @returns {boolean} result from mongo orm remove
	 */
	settingsRemove(settingsId) {
		if (this.userIsAdmin) {
			return Settings.find({_id: settingsId}).remove().exec();
		}
		throw new AuthenticationError();
	}
	/**
	 * Create a settings
	 * @param {Object} settings - candidate settings record to create
	 * @returns {Object} newly created setting
	 */
	settingsCreate(settings) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejection) {
				Settings.create(settings, function(err, inserted) {
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
