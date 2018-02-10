import { GraphQLObjectType } from 'graphql';

import projectQueryFields from './projects';
import commenterQueryFields from './commenters';
import commentQueryFields from './comments';
import userQueryFields from './users';
import annotationQueryFields from './annotations';
import bookQueryFields from './books';
import pagesQueryFields from './pages';
import settingsQueryFields from './settings';
import tenantsQueryFields from './tenants';
import keywordQueryFields from './keywords';
import referenceWorkQueryFields from './referenceWorks';
import discussionCommentQueryFields from './discussionComments';

/**
 * Root Queries
 * @type {GraphQLObjectType}
 */
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Root query object type',
	fields: {
		...projectQueryFields,
		...userQueryFields,
		...commenterQueryFields,
		...annotationQueryFields,
		...bookQueryFields,
		...pagesQueryFields,
		...settingsQueryFields,
		...tenantsQueryFields,
		...keywordQueryFields,
		...referenceWorkQueryFields,
		...discussionCommentQueryFields,
		...commentQueryFields,
	},
});

export default RootQuery;
