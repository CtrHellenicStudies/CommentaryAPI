/**
 * Mutations for reference works 
 */
import { GraphQLString, GraphQLNonNull } from 'graphql';

// types
import { ReferenceWorkType, ReferenceWorkInputType} from '../types/models/referenceWork';
import { RemoveType } from '../types/index';

// logic
import ReferenceWorksService from '../logic/ReferenceWorks/referenceWorks';

const referenceWorksMutationFields = {
	referenceWorkRemove: {
		type: RemoveType,
		description: 'Remove a single reference work',
		args: {
			referenceWorkId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {referenceWorkId}, {token}) => {
			const referenceWorksService = new ReferenceWorksService({token});
			return referenceWorksService.referenceWorkRemove(referenceWorkId);
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
		resolve: (parent, {referenceWorkId, referenceWork}, {token}) => {
			const referenceWorksService = new ReferenceWorksService({token});
			return referenceWorksService.referenceWorkUpdate(referenceWorkId, referenceWork);
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
		resolve: (parent, {referenceWork}, {token}) => {
			const referenceWorksService = new ReferenceWorksService({token});
			return referenceWorksService.referenceWorkCreate(referenceWork);
		}
	}
};

export default referenceWorksMutationFields;
