import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import GraphQLDate from 'graphql-date';
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
			optional: true
		},
		created: {
			type: GraphQLDate,
			optional: true
		},
		updated: {
			type: GraphQLDate,
			optional: true
		},
		author: {
			type: GraphQLString,
			optional: true
		},
		work: {
			type: WorkType,
			optional: true
		},
		subwork: {
			type: Subwork,
			optional: true
		},
		n: {
			type: GraphQLInt,
			optional: true
		},
		text: {
			type: GraphQLString,
			optional: true
		},
	},
});
const TranslationInputType = new GraphQLInputObjectType({
	name: 'TranslationInputType',
	fields: {
		tenantId: {
			type: GraphQLString,
			optional: true
		},
		created: {
			type: GraphQLDate,
			optional: true
		},
		updated: {
			type: GraphQLDate,
			optional: true
		},
		author: {
			type: GraphQLString,
			optional: true
		},
		work: {
			type: WorkType,
			optional: true
		},
		subwork: {
			type: Subwork,
			optional: true
		},
		n: {
			type: GraphQLInt,
			optional: true
		},
		text: {
			type: GraphQLString,
			optional: true
		},
	}
});

export { TranslationType, TranslationInputType };
