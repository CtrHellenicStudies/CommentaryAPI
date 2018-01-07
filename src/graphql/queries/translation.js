/**
 * Queries for translations
 */
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { TranslationType } from '../types/translation';

// logic
import TranslationService from '../logic/Translations/translations';

const translationsQueryFields = {
	translations: {
		type: new GraphQLList(TranslationType),
		description: 'Get list of translations',
		args: {
			tenantId: {
				type: GraphQLID,
			}
		},
		async resolve (parent, { tenantId }, { token }) {
			const translationService = new TranslationService(token);
			const translations = translationService.translationGet(tenantId);
			return translations;
		},
	},
	authorsOfTranslations: {
		type: new GraphQLList(TranslationType),
		description: 'Get list of authors for translation',
		args: {
			selectedWork: {
				type: GraphQLString
			},
			selectedSubwork: {
				type: GraphQLString
			}
		},
		async resolve (parent, { selectedWork, selectedSubwork }, { token }) {
			const translationService = new TranslationService(token);
			const translations = translationService.getAuthors(selectedWork, selectedSubwork);

			const authors = {};
			const ret = [];
			for (let i = 0; i < translations.length; i += 1) {
				if (!authors[translations[i].author]) {
					authors[translations[i].author] = true;
					ret.push(translations[i]);
				}
			}

			return translations;
		},
	},
};

export default translationsQueryFields;
