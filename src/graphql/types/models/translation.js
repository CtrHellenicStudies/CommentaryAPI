import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { WorkType } from './work';
import { Subwork } from './subworks';

/**
 * Translation model type
 * @type {GraphQLObjectType}
 */
const TranslationType = new GraphQLObjectType({
	name: 'TranslationType',
	description: 'A translation of a textnode in the commentary',
	fields: {
		tenantId: {
			type: GraphQLString,
		},
		created: {
			type: GraphQLDateTime,
		},
		updated: {
			type: GraphQLDateTime,
		},
		author: {
			type: GraphQLString,
		},
		work: {
<<<<<<< HEAD
			type: WorkType,
			optional: true
		},
		subwork: {
			type: Subwork,
			optional: true
=======
			type: GraphQLString,
		},
		subwork: {
			type: GraphQLInt,
>>>>>>> 770b5122e92b606d1be0764e81acae856da44e85
		},
		n: {
			type: GraphQLInt,
		},
		text: {
			type: GraphQLString,
		},
	},
});
const TranslationInputType = new GraphQLInputObjectType({
	name: 'TranslationInputType',
	fields: {
		tenantId: {
			type: GraphQLString,
		},
		created: {
			type: GraphQLDateTime,
		},
		updated: {
			type: GraphQLDateTime,
		},
		author: {
			type: GraphQLString,
		},
		work: {
<<<<<<< HEAD
			type: WorkType,
			optional: true
		},
		subwork: {
			type: Subwork,
			optional: true
=======
			type: GraphQLString,
		},
		subwork: {
			type: GraphQLInt,
>>>>>>> 770b5122e92b606d1be0764e81acae856da44e85
		},
		n: {
			type: GraphQLInt,
		},
		text: {
			type: GraphQLString,
		},
	}
});

export { TranslationType, TranslationInputType };
