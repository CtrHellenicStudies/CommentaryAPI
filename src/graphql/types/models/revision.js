import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInputObjectType
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import GraphQLDate from 'graphql-date';


/**
 * Comment input type
 * @type {GraphQLInputObjectType}
 */
const RevisionInputType = new GraphQLInputObjectType({
	name: 'RevisionInputType',
	description: 'Revision in revisions',
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
		type: GraphQLDate,
	},
	tenantId: {
		type: GraphQLString,
	},
	created: {
		type: GraphQLDate,
	},
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
			type: GraphQLDate,
		},
		tenantId: {
			type: GraphQLString,
		},
		created: {
			type: GraphQLDate,
		},
	},
});

export { RevisionInputType, RevisionType };
