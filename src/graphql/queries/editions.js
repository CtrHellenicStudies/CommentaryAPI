/**
 * Queries for editions
 */

import { GraphQLID, GraphQLList } from 'graphql';

// types
import {EditionsType} from '../types/models/editions';

// logic
import EditionsService from '../logic/Editions/editions';

const editionsQueryFields = {
	editions: {
		type: new GraphQLList(EditionsType),
		description: 'Get list of all editions',
		args: {
			editionId: {
				type: GraphQLID,
			},
		},
		resolve: (parent, { editionId }, {token}) => 
			EditionsService.editionsGet(editionId).then(function(editions) {
				return editions;
			})
	},
};


export default editionsQueryFields;
