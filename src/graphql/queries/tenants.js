/**
 * Queries for tenants
 */
import { GraphQLString, GraphQLList } from 'graphql';

// types
import { TenantType } from '../types/tenants';

// logicd
import TenantService from '../logic/tenants/tenants';


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
			const tenantService = new TenantService(token);
			const tenants = await tenantService.tenantsGet(tenantId);
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
			const tenantService = new TenantService(token);
			const tenant = await tenantService.tenantBySubdomainGet(subdomain);
			return tenant;
		},
	},
};

export default tenantsQueryFields;
