/**
 * Queries for annotations
 */

import { GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';

// types
import CommentType from '../types/comment';

// logic
import AnnotationService from '../logic/annotations';

const annotationQueryFields = {
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
			const annotations = await annotationService.annotationsGet(bookChapterUrl);
			return annotations;
		}
	},
};

export default annotationQueryFields;
