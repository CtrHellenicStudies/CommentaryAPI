/**
 * Queries for works
 */
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { WorkType } from '../types/work';

// logic
import WorkService from '../logic/Works/works';


const workQueryFields = {
	worksAhcip: {
		type: new GraphQLList(WorkType),
		description: 'Get list of works',
		args: {
			tenantId: {
				type: GraphQLID,
			},
			_id: {
				type: GraphQLID,
			},
		},
		async resolve (parent, { _id, tenantId }, { token }) {
			const workService = new WorkService(token);
			const works = workService.worksGet(_id, tenantId);
			return works;
		},
	},
};

export default workQueryFields;
