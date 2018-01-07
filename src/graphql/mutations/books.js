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
		resolve: (parent, { book }, {token}) => {
			const bookService = new BookService({token});
			return bookService.bookInsert(book);
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
		resolve: (parent, { _id, book }, {token}) => {
			const bookService = new BookService({token});
			return bookService.bookUpdate(_id, book);
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
		resolve: (parent, { bookId }, {token}) => {
			const bookService = new BookService({token});
			return bookService.bookRemove(bookId);
		}
	},
};

export default bookMutationFields;
