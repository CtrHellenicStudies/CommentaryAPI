/**
 * Queries for settings
 */
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { SettingsType } from '../types/settings';

// logic
import SettingsService from '../logic/Settings/settings';

const settingsQueryFields = {
	settings: {
		type: new GraphQLList(SettingsType),
		description: 'Get list of all setings',
		args: {
			tenantId: {
				type: GraphQLID,
			},
			_id: {
				type: GraphQLString
			}
		},
		async resolve (parent, { _id, tenantId }, { token }) {
			const settingsService = new SettingsService(token);
			const settings = await settingsService.settingsGet(_id, tenantId);
			return settings;
		},
	},
};

export default settingsQueryFields;
