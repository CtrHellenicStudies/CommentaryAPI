/**
 * Mutations for keywords 
 */
import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

// types
import { KeywordType, KeywordInputType} from '../types/models/keyword';
import { RemoveType } from '../types/index';

// logic
import KeywordService from '../logic/Keywords/keywords';

const keywordsMutationFields = {
	keywordRemove: {
		type: RemoveType,
		description: 'Remove a single keyword',
		args: {
			keywordId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve: (parent, {keywordId}, {token}) => {
			const keywordService = new KeywordService({token});
			return keywordService.keywordRemove(keywordId);
		}
	},
	keywordUpdate: {
		type: KeywordType,
		description: 'Update a single keyword',
		args: {
			keywordId: {
				type: new GraphQLNonNull(GraphQLString)
			},
			keyword: {
				type: new GraphQLNonNull(KeywordInputType)
			}
		},
		resolve: (parent, {keywordId, keyword}, {token}) => {
			const keywordService = new KeywordService({token});
			return keywordService.keywordUpdate(keywordId, keyword);
		}
	},
	keywordInsert: {
		type: KeywordType,
		description: 'Insert a single keyword',
		args: {
			keyword: {
				type: new GraphQLNonNull(KeywordInputType)
			}
		},
		async resolve(parent, {keyword}, token) {
			console.log(token);
			const keywordService = new KeywordService({token});
			return keywordService.keywordInsert(keyword).then(function(insertedKeyword) {
				return insertedKeyword;
			});
		}
	}
};

export default keywordsMutationFields;
