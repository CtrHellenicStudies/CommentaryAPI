import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLDateTime } from 'graphql-iso-date';
import { WorkType, WorkInputType } from './work';
import { Subwork, SubworkInput } from './subworks';

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
			type: WorkType,
			optional: true
		},
		subwork: {
			type: Subwork,
			optional: true
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
			type: WorkInputType,
			optional: true
		},
		subwork: {
			type: SubworkInput,
			optional: true

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
