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
		async resolve (parent, { tenantId }, { token }) {
			const tenantsService = new TenantsService(token);
			const tenants = await tenantsService.tenantsGet(tenantId);
			return tenants;
		},
	},
	tenantBySubdomain: {
		type: TenantType,
		description: 'Get tenant by subdomain',
		args: {
			subdomain: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { subdomain }, { token }) {
			const tenantsService = new TenantsService(token);
			const tenant = await tenantsService.tenantBySubdomainGet(subdomain);
			return tenant;
		},
	},
};

export default tenantsQueryFields;
