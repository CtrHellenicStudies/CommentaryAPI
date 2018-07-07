/**
 * Queries for settings
 */
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { SettingsType } from '../types/settings';

// logic
import SettingService from '../logic/Settings/settings';

const settingsQueryFields = {
	setting: {
		type: new GraphQLList(SettingsType),
		description: 'Get list of all settings',
		args: {
			_id: {
				type: GraphQLString
			},
			slug: {
				type: GraphQLID,
			},
		},
		async resolve (parent, { _id, tenantId }, { token }) {
			const settingService = new SettingService(token);
			const settings = await settingService.getSetting(_id, slug);
			return settings;
		},
	},
	settings: {
		type: new GraphQLList(SettingsType),
		description: 'Get list of all settings',
		args: {
			tenantId: {
				type: GraphQLID,
			},
		},
		async resolve (parent, { tenantId }, { token }) {
			const settingService = new SettingService(token);
			const settings = await settingService.getSettings(tenantId);
			return settings;
		},
	},
};

export default settingsQueryFields;
