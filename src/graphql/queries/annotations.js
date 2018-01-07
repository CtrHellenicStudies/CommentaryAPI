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
		resolve: (parent, { bookChapterUrl }, {token}) => {
			AnnotationService.annotationsGet(bookChapterUrl).then(function(annotations) {
				return annotations;
			});
		}
	},
};

export default annotationQueryFields;
