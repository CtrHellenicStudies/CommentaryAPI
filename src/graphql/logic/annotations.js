
import Comments from '../../models/comments';
import Books from '../../models/books';

import PermissionsService from './PermissionsService';
import { AuthenticationError } from '../errors/index';

/**
 * Logic-layer service for dealing with annotations
 */
export default class AnnotationService extends PermissionsService {
	/**
	 * Get all annotation comments for a given book chapter url
	 * @param {string} bookChapterUrl - the URL of the book chapter to be annotated
	 * @returns {Object[]} cursor of comments
	 */
	annotationsGet(bookChapterUrl) {
		const args = {
			bookChapterUrl,
			isAnnotation: true,
		};

		const promise = Comments.find(args).sort({paragraphN: 1}).exec();
		return promise;
	}

	/**
	 * Determine if the user in the graphql context is authenticated to annotate
	 * the current book
	 * @param {string} bookChapterUrl - the URL of the book chapter to be annotated
	 * @returns {boolean} if the user has the permission to annotate the book
	 */
	hasAnnotationPermission(chapterUrl) {
		const book = Books.findOne({'chapters.url': chapterUrl});
		const authorizedBooks = this.user.canAnnotateBooks || [];

		if (book) {
			return !!(this.user && ~authorizedBooks.indexOf(book._id));
		}

		return false;
	}

	/**
	 * Determine if the user in the graphql context is authenticated to revise the
	 * annotation of the supplied id
	 * @param {string} annotationId - the annotation id
	 * @returns {boolean} if the user has the permission to revise the comment
	 */
	hasAnnotationRevisionPermission(annotationId) {
		const comment = Comments.findOne({_id: annotationId, users: this.user._id});
		return !!comment;
	}

	/**
	 * Create an annotation comment
	 * @param {Object} annotation - an annotation candidate to create
	 * @returns {Object} the created annotation comment
	 */
	createAnnotation(annotation) {
		if (this.hasAnnotationPermission(annotation.bookChapterUrl) || this.userIsAdmin) {
			const commentId = Comments.insert({ ...annotation });
			return Comments.findOne(commentId);
		}

		throw new AuthenticationError();
	}


	/**
	 * Delete an annotation
	 * @param {Object} _id - the id of the annotation to delete
	 * @returns {boolean} result of the mongo orm remove
	 */
	deleteAnnotation(_id) {
		const annotation = Comments.findOne({ _id });
		if (this.hasAnnotationPermission(annotation.bookChapterUrl) || this.userIsAdmin) {
			return Comments.remove({ _id });
		}
		throw new AuthenticationError();
	}

	/**
	 * Add a revision to the annotation for the supplied annotation id
	 * @param {Object} _id - the id of the annotation to update
	 * @returns {boolean} result of the mongo orm update
	 */
	addRevision(_id, revision) {
		if (this.hasAnnotationRevisionPermission(_id) || this.userIsAdmin) {
			const newRevision = {
				title: revision.title,
				text: revision.text,
				created: new Date(),
			};

			return Comments.update({ _id }, {
				$addToSet: {
					revisions: newRevision,
				},
			});
		}
		throw new AuthenticationError();
	}
}
