/**
 * Queries for pages
 */

import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { PageType } from '../types/page';

// logic
import PageService from '../logic/pages';

const pagesQueryFields = {
	page: {
		type: new GraphQLList(PageType),
		description: 'Get list of all pages',
		args: {
			_id: {
				type: GraphQLString
			},
			slug: {
				type: GraphQLString
			},
		},
		async resolve (parent, { _id, slug }, { token }) {
			const pageService = new PageService(token);
			const pages = await pageService.getPage(_id, slug);
			return pages;
		},
	},
	pages: {
		type: new GraphQLList(PageType),
		description: 'Get list of all pages',
		args: {
			tenantId: {
				type: GraphQLID,
			},
			_id: {
				type: GraphQLString
			}
		},
		async resolve (parent, { _id, tenantId }, { token }) {
			const pageService = new PageService(token);
			const pages = await pageService.getPages(_id, tenantId);
			return pages;
		},
	},
};

export default pagesQueryFields;
