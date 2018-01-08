/**
 * Mutations for books
 */

import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

// types
import {EditionsType, EditionsInputType} from '../types/editions';
import RemoveType from '../types/remove';

// logic
import EditionService from '../logic/Editions/editions';

const editionMutationFields = {
	editionsInsert: {
		type: EditionsType,
		description: 'Create new edition',
		args: {
			edition: {
				type: new GraphQLNonNull(EditionsInputType)
			},
			multiline: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve (parent, { edition, multiline }, { token }) {
			const editionService = new EditionService({ token });
			return editionService.editionInsert(edition, multiline);
		}
	},
	editionsRemove: {
		type: RemoveType,
		description: 'Remove edition',
		args: {
			edition: {
				type: new GraphQLNonNull(EditionsInputType)
			},
			multiline: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve (parent, { edition, multiline }, { token }) {
			const editionService = new EditionService({ token });
			return editionService.removeEdition(edition, multiline);
		}
	},
};

export default editionMutationFields;
