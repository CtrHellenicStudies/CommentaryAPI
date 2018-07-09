/**
 * Queries for pages
 */

import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';

// types
import PageType from '../types/page';

// logic
import PageService from '../logic/pages';

const pagesQueryFields = {
	page: {
		type: PageType,
		description: 'Get a page',
		args: {
			_id: {
				type: GraphQLString,
			},
			slug: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { _id, slug }, { token }) {
			const pageService = new PageService(token);
			const page = await pageService.getPage({ _id, slug });
			return page;
		},
	},
	pages: {
		type: new GraphQLList(PageType),
		description: 'Get list of all pages',
		args: {
			tenantId: {
				type: GraphQLID,
			},
			textsearch: {
				type: GraphQLID,
			},
			offset: {
				type: GraphQLInt,
			},
			limit: {
				type: GraphQLInt,
			},
		},
		async resolve (parent, { tenantId, textsearch, offset, limit }, { token }) {
			const pageService = new PageService(token);
			const pages = await pageService.getPages({ tenantId, textsearch, offset, limit });
			return pages;
		},
	},
};

export default pagesQueryFields;
