import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInputObjectType,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import GraphQLDate from 'graphql-date';

import { WorkType, WorkInputType } from './work';
import { Subwork, SubworkInput } from './subworks';


/**
 * Text node model type
 * @type {GraphQLObjectType}
 */
const TextNodeType = new GraphQLObjectType({
	name: 'TextNodeType',
	description: 'A node of text from a primary source of the commentary',
	fields: {
		_id: {
			type: GraphQLID,
		},
		tenantId: {
			type: GraphQLString,
		},
		text: {
			type: new GraphQLList(new GraphQLObjectType({
				name: 'TextInputType',
				fields: {
					n: {
						type: GraphQLInt,
					},
					text: {
						type: GraphQLString,
					},
					html: {
						type: GraphQLString,
					},
					edition: {
						type: GraphQLString,
					},
				}
			})),
		},
		work: {
			type: WorkType,
		},
		subwork: {
			type: Subwork,
		},
		relatedPassages: {
			type: new GraphQLList(GraphQLJSON),
		},
	},
});

/**
 * Text node input type
 * @type {GraphQLInputObjectType}
 */
const TextNodeInputType = new GraphQLInputObjectType({
	name: 'TextNodeInputType',
	description: 'A node of text from a primary source of the commentary',
	fields: {
		tenantId: {
			type: GraphQLString,
		},
		text: {
			type: new GraphQLList(GraphQLJSON),
		},
		work: {
			type: WorkInputType,
		},
		subwork: {
			type: SubworkInput,
		},
		relatedPassages: {
			type: new GraphQLList(GraphQLJSON),
		},
	},
});

export { TextNodeType, TextNodeInputType };
