/**
 * Queries for books
 */

import { GraphQLID, GraphQLString, GraphQLList } from 'graphql';

// types
import { BookType } from '../types/book';

// logic
import BookService from '../logic/books';

const bookQueryFields = {
	book: {
		type: BookType,
		description: 'Get a book by id or slug',
		args: {
			_id: {
				type: GraphQLID,
			},
			slug: {
				type: GraphQLID,
			},
			chapterUrl: {
				type: GraphQLString
			},
		},
		async resolve (parent, { _id, slug, chapterUrl }, { token }) {
			const bookService = new BookService(token);
			const book = await bookService.booksGet(_id, slug, chapterUrl);
			return book;
		},
	},
	books: {
		type: new GraphQLList(BookType),
		description: 'Get list of all books',
		args: {
			chapterUrl: {
				type: GraphQLString
			},
		},
		async resolve (parent, { chapterUrl }, { token }) {
			const bookService = new BookService(token);
			const books = await bookService.getBooks(chapterUrl);
			return books;
		},
	},
};


export default bookQueryFields;
