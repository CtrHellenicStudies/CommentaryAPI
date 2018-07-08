/**
 * Queries for keywords
 */
import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { KeywordType } from '../types/keyword';

// logic
import KeywordService from '../logic/keywords/keywords';


const keywordQueryFields = {
	keyword: {
		type: KeywordType,
		description: 'Get a keyword (tag) by id',
		args: {
			tenantId: {
				type: GraphQLID,
			},
			id: {
				type: GraphQLString,
			},
			slug: {
				type: GraphQLString
			}
		},
		async resolve (parent, { tenantId, id, slug }, { token }) {
			const keywordService = new KeywordService(token);
			const keyword = await keywordService.getKeyword(id, slug, tenantId);
			return keyword;
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
		async resolve (parent, { tenantId, queryParam }, { token }) {
			const keywordService = new KeywordService(token);
			const keywords = await keywordService.getKeywords(tenantId, queryParam);
			return keywords;
		},
	},
};

export default keywordQueryFields;
