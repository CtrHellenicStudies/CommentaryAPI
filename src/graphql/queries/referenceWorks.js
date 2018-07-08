/**
 * Queries for reference works
 */

import { GraphQLString, GraphQLList } from 'graphql';

// types
import { ReferenceWorkType } from '../types/referenceWork';

// logic
import ReferenceWorkService from '../logic/referenceWorks/referenceWorks';


const referenceWorkQueryFields = {
	referenceWork: {
		type: new GraphQLList(ReferenceWorkType),
		description: 'Get a reference work document',
		args: {
			tenantId: {
				type: GraphQLString,
			},
			id: {
				type: GraphQLString,
			},
			slug: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { tenantId, id, slug }, { token }) {
			const referenceWorkService = new ReferenceWorkService(token);
			const referenceWorks = await referenceWorkService.getReferenceWork(id, slug, tenantId);
			return referenceWorks;
		}
	},
	referenceWorks: {
		type: new GraphQLList(ReferenceWorkType),
		description: 'Get list of reference works',
		args: {
			tenantId: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { tenantId, id }, { token }) {
			const referenceWorkService = new ReferenceWorkService(token);
			const referenceWorks = await referenceWorkService.getReferenceWorks(id, tenantId);
			return referenceWorks;
		}
	},
};

export default referenceWorkQueryFields;
