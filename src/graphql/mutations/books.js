/**
 * Mutations for books
 */

import { GraphQLNonNull, GraphQLID } from 'graphql';

// types
import {BookType, BookInputType} from '../types/book';
import RemoveType from '../types/remove';

// logic
import BookService from '../logic/books';

const bookMutationFields = {
	bookCreate: {
		type: BookType,
		description: 'Create new book',
		args: {
			book: {
				type: BookInputType
			}
		},
		async resolve (parent, { book }, { token }) {
			const bookService = new BookService({ token });
			const bookCreated = await bookService.bookInsert(book);
			return bookCreated;
		}
	},
	bookUpdate: {
		type: BookType,
		description: 'Update book',
		args: {
			_id: {
				type: new GraphQLNonNull(GraphQLID)
			},
			book: {
				type: new GraphQLNonNull(BookInputType)
			}
		},
		async resolve (parent, { _id, book }, { token }) {
			const bookService = new BookService({ token });
			const bookUpdated = await bookService.bookUpdate(_id, book);
			return bookUpdated;
		}
	},
	bookRemove: {
		type: RemoveType,
		description: 'Remove book',
		args: {
			bookId: {
				type: new GraphQLNonNull(GraphQLID)
			}
		},
		async resolve (parent, { bookId }, { token }) {
			const bookService = new BookService({ token });
			const bookRemove = await bookService.bookRemove(bookId);
			return bookRemove;
		}
	},
};

export default bookMutationFields;
