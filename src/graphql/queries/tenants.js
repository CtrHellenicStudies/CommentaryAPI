/**
 * Queries for tenants
 */
import { GraphQLString, GraphQLList } from 'graphql';

// types
import { TenantType } from '../types/tenants';

// logicd
import TenantsService from '../logic/Tenants/tenants';


const tenantsQueryFields = {
	tenants: {
		type: new GraphQLList(TenantType),
		description: 'Get list of tenants',
		args: {
			tenantId: {
				type: GraphQLString,
			},
		},
		resolve: (parent, { tenantId }, {token}) =>
			TenantsService.tenantsGet(tenantId).then(function(tenants) {
				return tenants;
			})
	},
	tenantBySubdomain: {
		type: TenantType,
		description: 'Get tenant by subdomain',
		args: {
			subdomain: {
				type: GraphQLString,
			},
		},
		resolve: (parent, { subdomain }, {token}) =>
			TenantsService.tenantBySubdomainGet(subdomain).then(function(tenants) {
				return tenants;
			})
	},
};

export default tenantsQueryFields;
