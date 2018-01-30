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
import { WorkType, WorkInputType } from './work';
import { Subwork, SubworkInput } from './subworks';
import { ReferenceWorkType, ReferenceWorkInputType } from './referenceWork';
import { KeywordType, KeywordInputType } from './keyword';
import { DiscussionCommentType, DiscussionCommentInputType } from './discussionComment';
import { RevisionType, RevisionInputType } from './revision';


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
			type: new GraphQLInputObjectType({
				name: 'LemmaCitationInputType',
				fields: {
					corpus: {
						type: GraphQLString
					},
					textGroup: {
						type: GraphQLString
					},
					work: {
						type: GraphQLString
					},
					passageFrom: {
						type: GraphQLString
					},
					passageTo: {
						type: GraphQLString
					}
				}
			}),
		}
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
			type: new GraphQLObjectType({
				name: 'LemmaCitationType',
				fields: {
					corpus: {
						type: GraphQLString
					},
					textGroup: {
						type: GraphQLString
					},
					work: {
						type: GraphQLString
					},
					passageFrom: {
						type: GraphQLString
					},
					passageTo: {
						type: GraphQLString
					}
				}
			}),
		},
	},
});

export { CommentInputType };
export default CommentType;
