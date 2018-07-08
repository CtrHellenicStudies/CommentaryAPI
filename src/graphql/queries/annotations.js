/**
 * Queries for annotations
 */

import { GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';

// types
import CommentType from '../types/comment';

// logic
import AnnotationService from '../logic/annotations';

const annotationQueryFields = {
	annotation: {
		type: CommentType,
		description: 'Get an annotation',
		args: {
			id: {
				type: GraphQLString,
			}
		},
		async resolve (parent, { id }, { token }) {
			const annotationService = new AnnotationService(token);
			const annotations = await annotationService.getAnnotation(id);
			return annotations;
		}
	},
	annotations: {
		type: new GraphQLList(CommentType),
		description: 'Get list of annotations for a book chapter',
		args: {
			bookChapterUrl: {
				type: GraphQLString,
			}
		},
		async resolve (parent, { bookChapterUrl }, { token }) {
			const annotationService = new AnnotationService(token);
			const annotations = await annotationService.getAnnotations(bookChapterUrl);
			return annotations;
		}
	},
};

export default annotationQueryFields;
