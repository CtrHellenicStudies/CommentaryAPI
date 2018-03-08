/**
 * Mutations for settings
 */

import { GraphQLString, GraphQLNonNull } from 'graphql';

// types
import { SettingsType, SettingsInputType } from '../types/settings';
import RemoveType from '../types/remove';

// logic
import SettingService from '../logic/Settings/settings';

const settingsMutationFields = {

	settingsRemove: {
		type: RemoveType,
		description: 'Remove a single settings',
		args: {
			settingsId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve (parent, {settingsId}, { token }) {
			const settingService = new SettingService({ token });
			return settingService.settingsRemove(settingsId);
		}
	},

	settingsUpdate: {
		type: SettingsType,
		description: 'Update a settings',
		args: {
			settings: {
				type: SettingsInputType
			}
		},
		async resolve (parent, { settings }, { token }) {
			const settingService = new SettingService({ token });
			return settingService.settingsUpdate(settings);
		}
	},
	settingsCreate: {
		type: SettingsType,
		description: 'Create a settings',
		args: {
			settings: {
				type: SettingsInputType
			}
		},
		async resolve (parent, {settings}, { token }) {
			const settingService = new SettingService({ token });
			return settingService.settingsCreate(settings);
		}
	}
};

export default settingsMutationFields;
