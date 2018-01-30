import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLInputObjectType,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { Subwork, SubworkInput } from './subworks';

/**
 * Keyword type
 * @type {GraphQLObjectType}
 */
const KeywordType = new GraphQLObjectType({
	name: 'KeywordType',
	description: 'A tag of a word or idea in the commentary',
	fields: {
		_id: {
			type: GraphQLString,
		},
		title: {
			type: GraphQLString,
		},
		slug: {
			type: GraphQLString,
		},
		description: {
			type: GraphQLString,
		},
		descriptionRaw: {
			type: GraphQLString,
		},
		type: {
			type: GraphQLString,
		},
		count: {
			type: GraphQLInt,
		},
		work: {
			type: new GraphQLObjectType({
				name: 'WorkKeywords',
				fields: {
					order: {
						type: GraphQLInt
					},
					title: {
						type: GraphQLString
					},
					slug: {
						type: GraphQLString
					}
				}
			}),
		},
		subwork: {
			type: Subwork,
		},
		lineFrom: {
			type: GraphQLInt,
		},
		lineTo: {
			type: GraphQLInt,
		},
		lineLetter: {
			type: GraphQLString,
		},
		nLines: {
			type: GraphQLInt,
		},
		tenantId: {
			type: GraphQLString,
		},
	},
});

/**
 * Keyword input type
 * @type {GraphQLInputObjectType}
 */
const KeywordInputType = new GraphQLInputObjectType({
	name: 'KeywordInputType',
	description: 'A tag of a word or idea in the commentary',
	fields: {
		_id: {
			type: GraphQLString,
		},
		title: {
			type: GraphQLString,
		},
		slug: {
			type: GraphQLString,
		},
		description: {
			type: GraphQLString,
		},
		descriptionRaw: {
			type: GraphQLString,
		},
		type: {
			type: GraphQLString,
		},
		count: {
			type: GraphQLInt,
		},
		work: {
			type: new GraphQLInputObjectType({
				name: 'WorkInputKeywords',
				fields: {
					order: {
						type: GraphQLInt
					},
					title: {
						type: GraphQLString
					},
					slug: {
						type: GraphQLString
					}
				}
			}),
		},
		subwork: {
			type: SubworkInput,
		},
		lineFrom: {
			type: GraphQLInt,
		},
		lineTo: {
			type: GraphQLInt,
		},
		lineLetter: {
			type: GraphQLString,
		},
		nLines: {
			type: GraphQLInt,
		},
		tenantId: {
			type: GraphQLString,
		},
	},
});

export { KeywordType, KeywordInputType };
