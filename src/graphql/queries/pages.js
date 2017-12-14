/**
 * Queries for pages
 */

import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';

// types
import { PageType } from '../types/models/page';

// logic
import PageService from '../logic/pages';

const pagesQueryFields = {
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
		resolve: (parent, { _id, tenantId }, {token}) => 
			PageService.pagesGet(_id, tenantId).then(function(pages) {
				return pages;
			})
	},
};

export default pagesQueryFields;
