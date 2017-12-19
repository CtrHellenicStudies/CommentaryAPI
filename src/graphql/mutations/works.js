/**
 * Mutations for works
 */

import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

// types
import { WorkType, WorkInputType } from '../types/models/work';
import { RemoveType } from '../types/index';

// logic
import WorksService from '../logic/Works/works';

const worksMutationFields = {
	workCreate: {
		type: WorkType,
		description: 'Create a new work',
		args: {
			work: {
				type: WorkInputType
			}
		},
		resolve: (parent, { work }, {token}) => {
			const worksService = new WorksService({token});
			return worksService.workInsert(work);
		}
	},
	workUpdate: {
		type: WorkType,
		description: 'Update a work',
		args: {
			_id: {
				type: GraphQLString
			},
			work: {
				type: WorkInputType
			}
		},
		resolve: (parent, { _id, work }, {token}) => {
			const worksService = new WorksService({token});
			return worksService.workUpdate(_id, work);
		}
	},
	workRemove: {
		type: RemoveType,
		description: 'Remove a single work',
		args: {
			workId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {workId}, {token}) => {
			const worksService = new WorksService({token});
			return worksService.workRemove(workId);
		}
	}
};

export default worksMutationFields;
