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
		resolve: (parent, { _id, tenantId }, {token}) => 
			SettingsService.settingsGet(_id, tenantId).then(function(settings) {
				return settings;
			})
	}
};

export default settingsQueryFields;
