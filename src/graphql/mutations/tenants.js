/**
 * Mutations for tenants
 */

import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

// types
import { TenantType, TenantInputType } from '../types/models/tenants';
import { RemoveType } from '../types/index';

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
		resolve: (parent, { tenant }, {token}) => {
			const tenantsService = new TenantsService({token});
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
		resolve: (parent, { _id, tenant }, {token}) => {
			const tenantsService = new TenantsService({token});
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
		resolve: (parent, {tenantId}, {token}) => {
			const tenantsService = new TenantsService({token});
			return tenantsService.tenantRemove(tenantId);
		}
	}
};

export default tenantsMutationFields;