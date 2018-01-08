/**
 * Mutations for works
 */

import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

// types
import { WorkType, WorkInputType } from '../types/work';
import RemoveType from '../types/remove';

// logic
import WorkService from '../logic/Works/works';

const worksMutationFields = {
	workCreate: {
		type: WorkType,
		description: 'Create a new work',
		args: {
			work: {
				type: WorkInputType
			}
		},
		async resolve (parent, { work }, { token }) {
			const workService = new WorkService({ token });
			return workService.workInsert(work);
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
		async resolve (parent, { _id, work }, { token }) {
			const workService = new WorkService({ token });
			return workService.workUpdate(_id, work);
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
		async resolve (parent, {workId}, { token }) {
			const workService = new WorkService({ token });
			return workService.workRemove(workId);
		}
	}
};

export default worksMutationFields;
