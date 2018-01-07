/**
 * Queries for works
 */
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { WorkType } from '../types/work';

// logic
import WorksService from '../logic/Works/works';


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
		resolve: (parent, { _id, tenantId }, {token}) => 
			WorksService.worksGet(_id, tenantId).then(function(works) {
				return works;
			})
	},
};

export default workQueryFields;
