/**
 * Mutations for text nodes
 */

import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLList
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';


// types
import { TranslationType, TranslationInputType } from '../types/models/translation';
import { WorkInputType } from '../types/models/work';
import { RemoveType } from '../types/index';

// logic
import TranslationService from '../logic/Translations/translations';

const translationsMutationFields = {
	translationRemove: {
		type: RemoveType,
		description: 'Remove a single translation',
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, { translationId }, {token}) => {
			const translationService = new TranslationService({token});
			return translationService.translationRemove(id);
		}
	},
	translationUpdate: {
		type: TranslationType,
		description: 'Update a single translation',
		args: {
			translation: {
				type: new GraphQLNonNull(TranslationInputType)
			}
		},
		resolve: (parent, { translation }, {token}) => {
			const translationService = new TranslationService({token});
			return translationService.translationUpdate(translation);
		}
	},
	translationInsert: {
		type: TranslationType,
		description: 'Insert a single translation',
		args: {
			translation: {
				type: new GraphQLNonNull(TranslationInputType)
			}
		},
		resolve: (parent, { translation }, {token}) => {
			const translationService = new TranslationService({token});
			return translationService.translationInsert(translation);
		}
	},
	translationUpdateAuthor: {
		type: TranslationType,
		description: 'Update translation author',
		args: {
			workDetails: {
				type: new GraphQLNonNull(WorkInputType)
			},
			name: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, { workSlug, name }, {token}) => {
			const translationService = new TranslationService({token});
			return translationService.translationUpdateAuthor(workSlug, name);
		}
	},
	translationAddAuthor: {
		type: TranslationType,
		description: 'Add author to translation',
		args: {
			workDetails: {
				type: new GraphQLNonNull(WorkInputType)
			},
			translation: {
				type: new GraphQLNonNull(TranslationInputType)
			},
			name: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, { workSlug, translation, name }, {token}) => {
			const translationService = new TranslationService({token});
			return translationService.translationAddAuthor(workSlug, translation, name);
		}
	},
};

export default translationsMutationFields;
