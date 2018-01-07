/**
 * Queries for keywords
 */

import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { KeywordType } from '../types/keyword';

// logic
import KeywordsService from '../logic/Keywords/keywords';

const keywordQueryFields = {
	keywords: {
		type: new GraphQLList(KeywordType),
		description: 'Get list of keywords (tags)',
		args: {
			tenantId: {
				type: GraphQLID,
			},
			id: {
				type: GraphQLString,
			},
			queryParam: {
				type: GraphQLString
			},
			slug: {
				type: GraphQLString
			}
		},
		resolve: (parent, { tenantId, id, slug, queryParam}, {token}) => 
			KeywordsService.keywordsGet(id, tenantId, slug, queryParam).then(function(keywords) {
				return keywords;
			})
	},
};

export default keywordQueryFields;
