/**
 * Queries for reference works
 */

import { GraphQLString, GraphQLList } from 'graphql';

// types
import { ReferenceWorkType } from '../types/referenceWork';

// logic
import ReferenceWorksService from '../logic/ReferenceWorks/referenceWorks';


const referenceWorkQueryFields = {
	referenceWorks: {
		type: new GraphQLList(ReferenceWorkType),
		description: 'Get list of reference works',
		args: {
			tenantId: {
				type: GraphQLString,
			},
			id: {
				type: GraphQLString,
			}
		},
		async resolve (parent, { tenantId, id }, { token }) {
			const referenceWorksService = new ReferenceWorksService(token);
			const referenceWorks = await referenceWorksService.referenceWorksGet(id, tenantId);
			return referenceWorks;
		}
	},
};

export default referenceWorkQueryFields;
