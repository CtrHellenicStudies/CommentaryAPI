/**
 * Queries for keywords
 */

import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { KeywordType } from '../types/keyword';

// logic
import KeywordService from '../logic/Keywords/keywords';

const keywordQueryFields = {
	keyword: {
		type: new GraphQLList(KeywordType),
		description: 'Get a keyword (tag) by id',
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
		async resolve (parent, { tenantId, id, slug, queryParam}, { token }) {
			const keywordService = new KeywordService(token);
			const keywords = await keywordService.getKeyword(id, tenantId, slug, queryParam);
			return keywords;
		},
	},
	keywords: {
		type: new GraphQLList(KeywordType),
		description: 'Get list of keywords (tags)',
		args: {
			tenantId: {
				type: GraphQLID,
			},
			queryParam: {
				type: GraphQLString
			},
		},
		async resolve (parent, { tenantId, queryParam}, { token }) {
			const keywordService = new KeywordService(token);
			const keywords = await keywordService.getKeywords(tenantId, queryParam);
			return keywords;
		},
	},
};

export default keywordQueryFields;
