import Books from '../../models/books';
import PermissionsService from './PermissionsService';
import { AuthenticationError } from '../errors/index';

/**
 * Logic-layer service for dealing with books
 */
export default class BookService extends PermissionsService {

	/**
	 * Rewrite chapters for modifiying books
	 * @param {(Object|Array)} chapter
	 * @returns {(Object|Array)} the new chapter
	 */
	static rewriteChapter(chapter) {
		if (chapter instanceof Array) {
			const newChapter = [];
			chapter.map((singleChapter) => {
				newChapter.push({
					title: singleChapter.title,
					slug: singleChapter.slug,
					url: singleChapter.url,
					n: singleChapter.n
				});
			});
			return newChapter;
		}
		return {
			title: chapter.title,
			slug: chapter.slug,
			url: chapter.url,
			n: chapter.n
		};
	}

	/**
	 * Create a new book
	 * @param {Object} book - a new book candidate
	 * @returns {Object} promise
	 */
	bookInsert(book) {
		if (this.userIsAdmin) {
			const newBook = book;
			newBook.chapters = this.rewriteChapter(book.chapters);
			return new Promise(function(resolve, rejection) {
				Books.create(newBook, function(err, inserted) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(inserted);
				});
			});
		}
		throw new AuthenticationError();
	}
	/**
	 * Update a book record
	 * @param {string} _id - id of book to be updated
	 * @param {Object} book - book update parameters
	 * @returns {Object} promise
	 */
	bookUpdate(_id, book) {
		if (this.userIsAdmin) {
			const newBook = book;
			newBook.chapters = this.rewriteChapter(book.chapters);
			return new Promise(function(resolve, rejected) {
				Books.update({_id: _id}, newBook, function(err, updated) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(updated);
				});
			});
		}
		throw new AuthenticationError();
	}

	/**
	 * Remove a book
	 * @param {string} _id - id of book to be updated
	 * @returns {Object} promise
	 */
	bookRemove(_id) {
		if (this.userIsAdmin) {
			return Books.find({_id: _id}).remove().exec();
		}
		throw new AuthenticationError();
	}
	/**
	 * Get a book by the supplied chapter url
	 * @param {string} chapterUrl - the URL of a chapter of the book
	 * @returns {Object} promise
	 */
	static bookByChapter(chapterUrl) {
		const args = {
			'chapters.url': chapterUrl,
		};
		const promise = Books.findOne(args).sort({slug: 1}).exec();
		return promise;
	}
	/**
	 * Get a book by supplied _id or chapter url
	 * @param {string} _id - the id of the book
	 * @param {string} chapterUrl - the URL of a chapter of the book
	 * @returns {Object} promise
	 */
	static booksGet(_id, chapterUrl) {
		const args = {};

		if (_id) {
			args._id = _id;
		}

		if (chapterUrl) {
			args['chapters.url'] = chapterUrl;
		}
		const promise = Books.find(args).sort({slug: 1, title: 1}).exec();
		return promise;
	}
}
