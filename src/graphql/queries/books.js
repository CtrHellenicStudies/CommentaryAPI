/**
 * Queries for books
 */

import { GraphQLID, GraphQLString, GraphQLList } from 'graphql';

// types
import { BookType } from '../types/book';

// logic
import BookService from '../logic/books';

const bookQueryFields = {
	books: {
		type: new GraphQLList(BookType),
		description: 'Get list of all books',
		args: {
			bookId: {
				type: GraphQLID,
			},
			chapterUrl: {
				type: GraphQLString
			},
		},
		async resolve (parent, { bookId, chapterUrl }, { token }) {
			const bookService = new BookService(token);
			const books = await bookService.booksGet(bookId, chapterUrl);
			return books;
		},
	},
	bookByChapter: {
		type: BookType,
		description: 'Get a book by the chapterUrl',
		args: {
			chapterUrl: {
				type: GraphQLString
			}
		},
		async resolve (parent, { chapterUrl }, { token }) {
			const bookService = new BookService(token);
			const book = await bookService.bookByChapter(chapterUrl);
			return book;
		},
	},
};


export default bookQueryFields;
