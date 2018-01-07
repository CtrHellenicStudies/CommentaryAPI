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
		resolve: (parent, { annotation }, {token}) => {
			const annotationService = new AnnotationService({token});
			return annotationService.createAnnotation(annotation);
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
		resolve: (parent, { id }, {token}) => {

			const annotationService = new AnnotationService({token});
			return annotationService.deleteAnnotation(id);
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
		resolve: (parent, {id, revision}, {token}) => {
			const annotationService = new AnnotationService({token});
			return annotationService.addRevision(id, revision);
		}
	}
};

export default annotationMutationFields;
