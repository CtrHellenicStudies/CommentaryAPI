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
import _ from 'underscore';

import { CommenterType, CommenterInputType } from './commenter';
import { ReferenceWorkType, ReferenceWorkInputType } from './referenceWork';
import { KeywordType, KeywordInputType } from './keyword';
import { DiscussionCommentType, DiscussionCommentInputType } from './discussionComment';
import { RevisionType, RevisionInputType } from './revision';
import LemmaCitationType, { LemmaCitationInputType } from './lemmaCitation';

const PassageType = new GraphQLObjectType({
	name: 'PassageType',
	description: 'A passage in the lemma citation of the comment',
	fields: {
		index: {
			type: GraphQLInt,
		},
		location: {
			type: new GraphQLList(GraphQLInt),
		},
	},
});


const PassageInputType = new GraphQLInputObjectType({
	name: 'PassageInputType',
	description: 'A passage in the lemma citation of the comment',
	fields: {
		index: {
			type: GraphQLInt,
		},
		location: {
			type: new GraphQLList(GraphQLInt),
		},
	},
});

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
		referenceWorks: {
			type: new GraphQLList(new GraphQLInputObjectType({
				name: 'ReferenceWorkIdsInputType',
				fields: {
					referenceWorkId: {
						type: GraphQLString
					},
					section: {
						type: GraphQLInt
					},
					chapter: {
						type: GraphQLInt
					},
					note: {
						type: GraphQLInt
					},
					translation: {
						type: GraphQLInt
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
		lemmaCitation: {
			type: LemmaCitationInputType,
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
		users: {
			type: new GraphQLList(GraphQLString),
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
		referenceWorks: {
			type: new GraphQLList(new GraphQLObjectType({
				name: 'ReferenceWorkIdsType',
				fields: {
					referenceWorkId: {
						type: GraphQLString
					},
					section: {
						type: GraphQLInt
					},
					chapter: {
						type: GraphQLInt
					},
					note: {
						type: GraphQLInt
					},
					translation: {
						type: GraphQLInt
					}
				}
			})),
		},
		keywords: {
			type: new GraphQLList(KeywordType),
		},
		revisions: {
			type: new GraphQLList(RevisionType),
		},
		latestRevision: {
			type: RevisionType,
			description: 'Returns only the latest revision of the array of revisions',
			resolve (parent) {
				parent.revisions.sort((a, b) => (
					new Date(b.created) - new Date(a.created)
				));
				const latestRevision = parent.revisions[0];

				return latestRevision;
			},
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
		lemmaCitation: {
			type: LemmaCitationType,
		},
		commenters: {
			type: new GraphQLList(CommenterType),
			description: 'Get commenters for comment',
			resolve(parent, a, { token }) {
				const commenterService = new CommenterService(token);
				return commenterService.getCommenters(parent.tenantId, parent.commenters);
			},
		},
	},
});

export { CommentInputType };
export default CommentType;
