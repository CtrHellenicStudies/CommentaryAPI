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

import CommentType from './comment';
import Comments from '../../../models/comments';

/**
 * Book input type for creating books
 * @type {GraphQLInputObjectType}
 */
const BookInputType = new GraphQLInputObjectType({
	name: 'BookInputType',
	description: 'A book input type',
	fields: {
		title: {
			type: GraphQLString
		},
		slug: {
			type: GraphQLString
		},
		author: {
			type: GraphQLString
		},
		authorURN: {
			type: GraphQLString
		},
		chapters: {
			type: new GraphQLList(GraphQLJSON)
		},
		coverImage: {
			type: GraphQLString
		},
		year: {
			type: GraphQLInt
		},
		publisher: {
			type: GraphQLString
		},
		citation: {
			type: GraphQLString
		},
		tenantId: {
			type: GraphQLString
		}
	}
});

/**
 * Book model type
 * @type {GraphQLObjectType}
 */
const BookType = new GraphQLObjectType({
	name: 'BookType',
	description: 'A single book',
	fields: {
		_id: {
			type: GraphQLString
		},
		title: {
			type: GraphQLString
		},
		slug: {
			type: GraphQLString
		},
		author: {
			type: GraphQLString
		},
		chapters: {
			type: new GraphQLList(GraphQLJSON)
		},
		coverImage: {
			type: GraphQLString
		},
		year: {
			type: GraphQLInt
		},
		publisher: {
			type: GraphQLString
		},
		citation: {
			type: GraphQLString
		},
		tenantId: {
			type: GraphQLString
		},

		annotations: {
			type: new GraphQLList(CommentType),
			args: {
				chapterUrl: {
					type: GraphQLString,
				},
			},
			resolve: ( _, { chapterUrl }, context ) => {
				/**
				const comments = Comments.find({
					bookChapterUrl: chapterUrl,
				});
				*/
				return []; 
			}
		}
	}
});

export { BookInputType, BookType };
