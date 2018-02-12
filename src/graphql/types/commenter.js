import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

/**
 * Commenter model type
 * @type {GraphQLObjectType}
 */
const CommenterType = new GraphQLObjectType({
	name: 'CommenterType',
	description: 'A commenter in the commentary',
	fields: {
		_id: {
			type: GraphQLString,
		},
		tenantId: {
			type: GraphQLString,
		},
		name: {
			type: GraphQLString,
		},
		slug: {
			type: GraphQLString,
		},
		avatar: {
			type: new GraphQLObjectType({
				name: 'AvatarType',
				fields: {
					src: {
						type: GraphQLString
					},
					filename: {
						type: GraphQLString
					},
					type: {
						type: GraphQLString
					},
					size: {
						type: GraphQLInt
					},
					directive: {
						type: GraphQLString
					},
					key: {
						type: GraphQLString
					}
				}
			}),
		},
		bio: {
			type: GraphQLString,
		},
		isAuthor: {
			type: GraphQLBoolean,
		},
		tagline: {
			type: GraphQLString,
		},
		featureOnHomepage: {
			type: GraphQLBoolean,
		},
		nCommentsTotal: {
			type: GraphQLInt,
		},
		nCommentsKeywords: {
			type: new GraphQLList(GraphQLJSON),
		},
	},
});

/**
 * Commenter input type
 * @type {GraphQLInputObjectType}
 */
const CommenterInputType = new GraphQLInputObjectType({
	name: 'CommenterInputType',
	description: 'A commenter in the commentary',
	fields: {
		tenantId: {
			type: GraphQLString,
		},
		name: {
			type: GraphQLString,
		},
		slug: {
			type: GraphQLString,
		},
		avatar: {
			type: new GraphQLInputObjectType({
				name: 'AvatarInputType',
				fields: {
					src: {
						type: GraphQLString
					},
					filename: {
						type: GraphQLString
					},
					type: {
						type: GraphQLString
					},
					size: {
						type: GraphQLInt
					},
					directive: {
						type: GraphQLString
					},
					key: {
						type: GraphQLString
					}
				}
			}),
		},
		bio: {
			type: GraphQLString,
		},
		isAuthor: {
			type: GraphQLBoolean,
		},
		tagline: {
			type: GraphQLString,
		},
		featureOnHomepage: {
			type: GraphQLBoolean,
		},
		nCommentsTotal: {
			type: GraphQLInt,
		},
		nCommentsWorks: {
			type: new GraphQLList(GraphQLJSON),
		},
		nCommentsKeywords: {
			type: new GraphQLList(GraphQLJSON),
		},
	},
});

export { CommenterType, CommenterInputType };
