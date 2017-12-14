import Settings from '../../../models/settings';
import PermissionsService from '../PermissionsService';

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
	static settingsGet(_id, tenantId) {

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
			return Settings.update(_id, {$set: settings});
		}
		return new Error('Not authorized');
	}

	/**
	 * Remove a settings
	 * @param {string} settingsId - id of settings
	 * @returns {boolean} result from mongo orm remove
	 */
	settingsRemove(settingsId) {
		if (this.userIsAdmin) {
			return Settings.remove({_id: settingsId});
		}
		return new Error('Not authorized');
	}

	/**
	 * Create a settings
	 * @param {Object} settings - candidate settings record to create
	 * @returns {Object} newly created setting
	 */
	settingsCreate(settings) {
		if (this.userIsAdmin) {
			const settingsId = Settings.insert({...settings});
			return Settings.findOne(settingsId);
		}
		return new Error('Not authorized');
	}
}
