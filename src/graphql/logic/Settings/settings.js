import Settings from '../../../models/settings';
import PermissionsService from '../PermissionsService';
import { PermissionError } from '../../errors';

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
	async settingsGet(_id, tenantId) {

		const args = {};

		if (tenantId) {
			args.tenantId = tenantId;
		}

		if (_id) {
			args._id = _id;
		}

		const settings = await Settings.find(args);
		return settings;
	}

	/**
	 * Get settings
	 * @param {string} tenantId - id of current tenant
	 * @returns {Object} array of settings
	 */
	async settingsGetByTenantId(tenantId) {

		if (!tenantId) {
			return null;
		}

		const args = { tenantId };

		const settings = await Settings.findOne(args);
		return settings;
	}

	/**
	 * Update a settings
	 * @param {Object} settings - setting to update
	 * @returns {boolean} result from mongo orm update
	 */
	async settingsUpdate(settings) {

		if (!this.userIsAdmin) {
			throw new PermissionError();
		}

		const result = await Settings.update({
			_id: settings._id,
		}, {
			$set: settings,
		});

		return result;
	}

	/**
	 * Remove a settings
	 * @param {string} settingsId - id of settings
	 * @returns {boolean} result from mongo orm remove
	 */
	async settingsRemove(settingsId) {
		if (!this.userIsAdmin) {
			throw new PermissionError();
		}
		return await Settings.find({_id: settingsId}).remove().exec();
	}

	/**
	 * Create a settings
	 * @param {Object} settings - candidate settings record to create
	 * @returns {Object} newly created setting
	 */
	async settingsCreate(settings) {
		if (!this.userIsAdmin) {
			throw new PermissionError();
		}
		const newSettings = new Settings(settings);
		const result = await newSettings.save();
		return result;
	}
}
