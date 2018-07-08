/**
 * Queries for settings
 */
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { SettingsType } from '../types/settings';

// logic
import SettingService from '../logic/settings/settings';

const settingsQueryFields = {
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
