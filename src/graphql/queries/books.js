/**
 * Queries for books
 */

import { GraphQLID, GraphQLString, GraphQLList } from 'graphql';

// types
import { BookType } from '../types/models/book';

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
			}
		},
		resolve: (parent, { bookId, chapterUrl }, {token}) => 
			BookService.booksGet(bookId, chapterUrl).then(function(books) {
				return books;
			})
	},
	bookByChapter: {
		type: BookType,
		description: 'Get a book by the chapterUrl',
		args: {
			chapterUrl: {
				type: GraphQLString
			}
		},
		resolve: (parent, { chapterUrl }, { token }) =>
			BookService.bookByChapter(chapterUrl).then(function(book) {
				return book;
			})
	},
};


export default bookQueryFields;
