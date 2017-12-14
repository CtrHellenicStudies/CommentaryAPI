/**
 * Queries for works
 */
import { GraphQLID, GraphQLList } from 'graphql';

// types
import { WorkType } from '../types/models/work';

// logic
import WorksService from '../logic/Works/works';


const workQueryFields = {
	works: {
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
		resolve: (parent, { _id, tenantId }, {token}) => 
			WorksService.worksGet(_id, tenantId).then(function(works) {
				return works;
			})
	},
};

export default workQueryFields;
