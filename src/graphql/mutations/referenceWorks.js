/**
 * Mutations for reference works
 */
import { GraphQLString, GraphQLNonNull } from 'graphql';

// types
import { ReferenceWorkType, ReferenceWorkInputType} from '../types/referenceWork';
import RemoveType from '../types/remove';

// logic
import ReferenceWorkService from '../logic/referenceWorks/referenceWorks';

const referenceWorksMutationFields = {
	referenceWorkRemove: {
		type: RemoveType,
		description: 'Remove a single reference work',
		args: {
			referenceWorkId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve (parent, {referenceWorkId}, { token }) {
			const referenceWorkService = new ReferenceWorkService({ token });
			return referenceWorkService.referenceWorkRemove(referenceWorkId);
		}
	},
	referenceWorkUpdate: {
		type: ReferenceWorkType,
		description: 'Update a single reference work',
		args: {
			referenceWorkId: {
				type: new GraphQLNonNull(GraphQLString)
			},
			referenceWork: {
				type: new GraphQLNonNull(ReferenceWorkInputType)
			}
		},
		async resolve (parent, {referenceWorkId, referenceWork}, { token }) {
			const referenceWorkService = new ReferenceWorkService({ token });
			return referenceWorkService.referenceWorkUpdate(referenceWorkId, referenceWork);
		}
	},
	referenceWorkCreate: {
		type: ReferenceWorkType,
		description: 'Create a referenceWork',
		args: {
			referenceWork: {
				type: ReferenceWorkInputType
			}
		},
		async resolve (parent, {referenceWork}, { token }) {
			const referenceWorkService = new ReferenceWorkService({ token });
			return referenceWorkService.referenceWorkCreate(referenceWork);
		}
	}
};

export default referenceWorksMutationFields;
