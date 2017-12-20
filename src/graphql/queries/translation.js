/**
 * Queries for translations
 */
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { TranslationType } from '../types/models/translation';

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
		resolve: (parent, { tenantId }, {token}) =>
			TranslationService.translationGet(tenantId).then(function(translations) {
				return translations;
			})
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
		resolve: (parent, { selectedWork, selectedSubwork }, {token}) => 
			TranslationService.getAuthors(selectedWork, selectedSubwork).then(function(translations) {
				const authors = {};
				const ret = [];
				for (let i = 0; i < translations.length; i += 1) {
					if (!authors[translations[i].author]) {
						authors[translations[i].author] = true;
						ret.push(translations[i]);
					}
				}
				return ret;
			})
	}
};

export default translationsQueryFields;
