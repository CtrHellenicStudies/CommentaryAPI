/**
 * Mutations for tenants
 */

import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

// types
import { TenantType, TenantInputType } from '../types/tenants';
import RemoveType from '../types/remove';

// logic
import TenantsService from '../logic/Tenants/tenants';

const tenantsMutationFields = {
	tenantCreate: {
		type: TenantType,
		description: 'Create a new tenant',
		args: {
			tenant: {
				type: TenantInputType
			}
		},
		async resolve (parent, { tenant }, { token }) {
			const tenantsService = new TenantsService({ token });
			return tenantsService.tenantCreate(tenant);
		}
	},
	tenantUpdate: {
		type: TenantType,
		description: 'Update a tenant',
		args: {
			_id: {
				type: GraphQLString
			},
			tenant: {
				type: TenantInputType
			}
		},
		async resolve (parent, { _id, tenant }, { token }) {
			const tenantsService = new TenantsService({ token });
			return tenantsService.tenantUpdate(_id, tenant);
		}
	},
	tenantRemove: {
		type: RemoveType,
		description: 'Remove a single tenant',
		args: {
			tenantId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve (parent, {tenantId}, { token }) {
			const tenantsService = new TenantsService({ token });
			return tenantsService.tenantRemove(tenantId);
		}
	}
};

export default tenantsMutationFields;
