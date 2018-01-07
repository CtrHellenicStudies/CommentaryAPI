/**
 * Queries for editions
 */

import { GraphQLID, GraphQLList } from 'graphql';

// types
import { EditionsType } from '../types/editions';

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
		async resolve (parent, { editionId }, { token }) {
			const editionService = new EditionService(token);
			const editions = await editionsService.editionsGet(editionId);
			return editions;
		},
	},
};


export default editionsQueryFields;
