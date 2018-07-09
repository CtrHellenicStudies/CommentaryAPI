import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInputObjectType
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLDateTime } from 'graphql-iso-date';

import { SettingsType } from '../types/settings';

// logic
import SettingService from '../logic/settings/settings';


/**
 * Tenant model type
 * @type {GraphQLObjectType}
 */
const TenantType = new GraphQLObjectType({
	name: 'TenantType',
	description: 'Tenant db record',
	fields: {
		_id: {
			type: GraphQLString
		},
		subdomain: {
			type: GraphQLString
		},
		isAnnotation: {
			type: GraphQLBoolean,
		},
		settings: {
			type: SettingsType,
			async resolve(parent, args, { token }) {
				const settingService = new SettingService(token);
				const settings = await settingService.settingsGetByTenantId(parent._id);
				return settings;
			}
		},
	},
});

/**
 * Tenant input type
 * @type {GraphQLInputObjectType}
 */
const TenantInputType = new GraphQLInputObjectType({
	name: 'TenantInputType',
	description: 'Tenant db record',
	fields: {
		subdomain: {
			type: GraphQLString
		},
		isAnnotation: {
			type: GraphQLBoolean,
		}
	},
});

export {TenantType, TenantInputType};
