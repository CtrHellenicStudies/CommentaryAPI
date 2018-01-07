/**
 * Mutations for annotations on the CHS reading interfaces
 */

import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

// types
import CommentType, { CommentInputType } from '../types/comment';
import RemoveType from '../types/remove';
import { RevisionInputType } from '../types/revision';

// models
import Comments from '../../models/comments';
import Books from '../../models/books';

// logic
import AnnotationService from '../logic/annotations';

const annotationMutationFields = {
	annotationCreate: {
		type: CommentType,
		description: 'Create new annotation',
		args: {
			annotation: {
				type: CommentInputType
			}
		},
		async resolve (parent, { annotation }, { token }) {
			const annotationService = new AnnotationService({ token });
			const annotationCreated = await annotationService.createAnnotation(annotation);
			return annotationCreated;
		}
	},
	annotationRemove: {
		type: RemoveType,
		description: 'Remove annotation',
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve (parent, { id }, { token }) {
			const annotationService = new AnnotationService({ token });
			const remove = await annotationService.deleteAnnotation(id);
			return remove;
		}
	},
	annotationAddRevision: {
		type: CommentType,
		description: 'Add annotation revision',
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLString)
			},
			revision: {
				type: new GraphQLNonNull(RevisionInputType)
			}
		},
		async resolve (parent, {id, revision}, { token }) {
			const annotationService = new AnnotationService({ token });
			const annotationUpdated = awaitannotationService.addRevision(id, revision);
			return annotationUpdated;
		}
	}
};

export default annotationMutationFields;
