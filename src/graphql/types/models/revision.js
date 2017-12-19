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
 * Comment input type
 * @type {GraphQLInputObjectType}
 */
const RevisionInputType = new GraphQLInputObjectType({
	name: 'RevisionInputType',
	description: 'Revision in revisions',
	fields: {
		_id: {
			type: GraphQLString,
		},
		title: {
			type: GraphQLString
		},
		text: {
			type: GraphQLString
		},
		slug: {
			type: GraphQLString
		},
		originalDate: {
			type: GraphQLDateTime,
		},
		tenantId: {
			type: GraphQLString,
		},
		created: {
			type: GraphQLDateTime,
		}
	}
});
/**
 * Comment model type
 * @type {GraphQLObjectType}
 */
const RevisionType = new GraphQLObjectType({
	name: 'RevisionType',
	description: 'Revision in revisions',
	fields: {
		_id: {
			type: GraphQLString,
		},
		title: {
			type: GraphQLString
		},
		text: {
			type: GraphQLString
		},
		slug: {
			type: GraphQLString
		},
		originalDate: {
			type: GraphQLDateTime,
		},
		tenantId: {
			type: GraphQLString,
		},
		created: {
			type: GraphQLDateTime,
		},
	},
});

export { RevisionInputType, RevisionType };
