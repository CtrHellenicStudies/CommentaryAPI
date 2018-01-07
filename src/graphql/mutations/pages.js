/**
 * Mutations for pages
 */

import { GraphQLString, GraphQLNonNull } from 'graphql';

// types
import { PageType, PageInputType} from '../types/page';
import RemoveType from '../types/remove';

// logic
import PagesService from '../logic/pages';

const pagesMutationFields = {
	pageRemove: {
		type: RemoveType,
		description: 'Remove a single page',
		args: {
			pageId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve (parent, {pageId}, { token }) {
			const pagesService = new PagesService({ token });
			return pagesService.pageRemove(pageId);
		}
	},
	pageUpdate: {
		type: PageType,
		description: 'Update a single page',
		args: {
			pageId: {
				type: new GraphQLNonNull(GraphQLString)
			},
			page: {
				type: new GraphQLNonNull(PageInputType)
			}
		},
		async resolve (parent, {pageId, page}, { token }) {
			const pagesService = new PagesService({ token });
			return pagesService.pageUpdate(pageId, page);
		}
	},
	pageCreate: {
		type: PageType,
		description: 'Create a page',
		args: {
			page: {
				type: PageInputType
			}
		},
		async resolve (parent, {page}, { token }) {
			const pagesService = new PagesService({ token });
			return pagesService.pageCreate(page);
		}
	}
};

export default pagesMutationFields;
