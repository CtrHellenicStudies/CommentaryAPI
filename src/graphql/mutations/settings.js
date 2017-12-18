/**
 * Mutations for settings
 */

import { GraphQLString, GraphQLNonNull } from 'graphql';

// types
import { SettingsType, SettingsInputType } from '../types/models/settings';
import { RemoveType } from '../types/index';

// logic
import SettingsService from '../logic/Settings/settings';

const settingsMutationFields = {

	settingsRemove: {
		type: RemoveType,
		description: 'Remove a single settings',
		args: {
			settingsId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {settingsId}, {token}) => {
			const settingsService = new SettingsService({token});
			return settingsService.settingsRemove(settingsId);
		}
	},
	settingsUpdate: {
		type: SettingsType,
		description: 'Update a settings',
		args: {
			settingsId: {
				type: new GraphQLNonNull(GraphQLString)
			},
			settings: {
				type: SettingsInputType
			}
		},
		resolve: (parent, {settingsId, settings}, {token}) => {
			const settingsService = new SettingsService({token});
			return settingsService.settingsUpdate(settingsId, settings);
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
		resolve: (parent, {settings}, {token}) => {
			const settingsService = new SettingsService({token});
			return settingsService.settingsCreate(settings);
		}
	}
};

export default settingsMutationFields;
