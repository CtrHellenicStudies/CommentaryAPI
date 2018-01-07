import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInputObjectType
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLDateTime } from 'graphql-iso-date';


/**
 * Subwork model type
 * @type {GraphQLObjectType}
 */
const Subwork = new GraphQLObjectType({
	name: 'Subwork',
	description: 'Subwork - part of a single work type',
	fields: {
		title: {
			type: GraphQLString,
		},
		slug: {
			type: GraphQLString,
		},
		n: {
			type: GraphQLInt,
		},
		tlgNumber: {
			type: GraphQLString,
		},
		nComments: {
			type: GraphQLInt,
		},
		commentHeatmap: {
			type: new GraphQLList(new GraphQLObjectType({
				name: 'CommentHeatmapType',
				fields: {
					nComments: {
						type: GraphQLInt
					},
					n: {
						type: GraphQLInt
					}
				}
			})),
		},
	},
});

/**
 * Subwork input type
 * @type {GraphQLInputObjectType}
 */
const SubworkInput = new GraphQLInputObjectType({
	name: 'SubworkInput',
	description: 'Subwork - part of a single work type',
	fields: {
		title: {
			type: GraphQLString,
		},
		slug: {
			type: GraphQLString,
		},
		n: {
			type: GraphQLInt,
		},
		tlgNumber: {
			type: GraphQLString,
		},
		nComments: {
			type: GraphQLInt,
		},
		commentHeatmap: {
			type: new GraphQLList(GraphQLJSON),
		},
	},
});

export { Subwork, SubworkInput };
