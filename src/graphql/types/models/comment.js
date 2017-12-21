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
import { CommenterType, CommenterInputType } from './commenter';
import { WorkType, WorkInputType } from './work';
import { Subwork, SubworkInput } from './subworks';
import { ReferenceWorkType, ReferenceWorkInputType } from './referenceWork';
import { KeywordType, KeywordInputType } from './keyword';
import { DiscussionCommentType, DiscussionCommentInputType } from './discussionComment';
import { RevisionType, RevisionInputType } from './revision';



/**
 * Comment input type
 * @type {GraphQLInputObjectType}
 */
const CommentInputType = new GraphQLInputObjectType({
	name: 'CommentInputType',
	description: 'A comment in the commentary',
	fields: {
		_id: {
			type: GraphQLString,
		},
		urn: {
			type: GraphQLJSON,
		},
		originalDate: {
			type: GraphQLDateTime,
		},
		status: {
			type: GraphQLString,
		},
		tenantId: {
			type: GraphQLString,
		},
		commenters: {
			type: new GraphQLList(CommenterInputType),
		},
		users: {
			type: new GraphQLList(GraphQLString),
		},
		work: {
			type: WorkInputType
		},
		subwork: {
			type: SubworkInput
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
		bookChapterUrl: {
			type: GraphQLString,
		},
		paragraphN: {
			type: GraphQLInt,
		},
		nLines: {
			type: GraphQLInt,
		},
		commentOrder: {
			type: GraphQLInt,
		},
		parentCommentId: {
			type: GraphQLString,
		},
		referenceId: {
			type: GraphQLString,
		},
		referenceWorks: {
			type: new GraphQLList(new GraphQLInputObjectType({
				name: 'ReferenceWorkIdsInputType',
				fields: {
					referenceId: {
						type: GraphQLString
					}
				}
			}),
			),
		},
		keywords: {
			type: new GraphQLList(KeywordInputType),
		},
		revisions: {
			type: new GraphQLList(RevisionInputType),
		},
		discussionComments: {
			type: new GraphQLList(DiscussionCommentInputType),
		},
		isAnnotation: {
			type: GraphQLBoolean,
		},
		discussionCommentsDisabled: {
			type: GraphQLBoolean,
		},
		created: {
			type: GraphQLDateTime,
		},
		updated: {
			type: GraphQLDateTime,
		},
	},
});
/**
 * Comment model type
 * @type {GraphQLObjectType}
 */
const CommentType = new GraphQLObjectType({
	name: 'CommentType',
	description: 'A comment in the commentary',
	fields: {
		_id: {
			type: GraphQLString,
		},
		urn: {
			type: new GraphQLObjectType({
				name: 'UrnType',
				fields: {
					v1: {
						type: GraphQLString,
						optional: true
					},
					v2: {
						type: GraphQLString
					}
				}
			}),
		},
		originalDate: {
			type: GraphQLDateTime,
		},
		status: {
			type: GraphQLString,
		},
		tenantId: {
			type: GraphQLString,
		},
		commenters: {
			type: new GraphQLList(CommenterType),
		},
		users: {
			type: new GraphQLList(GraphQLString),
		},
		work: {
			type: WorkType
		},
		subwork: {
			type: Subwork
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
		bookChapterUrl: {
			type: GraphQLString,
		},
		paragraphN: {
			type: GraphQLInt,
		},
		nLines: {
			type: GraphQLInt,
		},
		commentOrder: {
			type: GraphQLInt,
		},
		parentCommentId: {
			type: GraphQLString,
		},
		referenceId: {
			type: GraphQLString,
		},
		referenceWorks: {
			type: new GraphQLList(ReferenceWorkType),
		},
		keywords: {
			type: new GraphQLList(KeywordType),
		},
		revisions: {
			type: new GraphQLList(RevisionType),
		},
		discussionComments: {
			type: new GraphQLList(DiscussionCommentType),
		},
		isAnnotation: {
			type: GraphQLBoolean,
		},
		discussionCommentsDisabled: {
			type: GraphQLBoolean,
		},
		created: {
			type: GraphQLDateTime,
		},
		updated: {
			type: GraphQLDateTime,
		},
	},
});

export { CommentInputType };
export default CommentType;
