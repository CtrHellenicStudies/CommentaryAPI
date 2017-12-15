import { GraphQLObjectType } from 'graphql';

import projectQueryFields from './projects';
import commenterQueryFields from './commenters';
import commentQueryFields from './comments';
import userQueryFields from './users';
import miradorQueryFields from './miradorManifests';
import annotationQueryFields from './annotations';
import bookQueryFields from './books';
import pagesQueryFields from './pages';
import editionsQueryFields from './editions';
import settingsQueryFields from './settings';
import workQueryFields from './works';
import tenantsQueryFields from './tenants';
import keywordQueryFields from './keywords';
import referenceWorkQueryFields from './referenceWorks';
import discussionCommentQueryFields from './discussionComments';
import translationsQueryFields from './translation';

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
		...miradorQueryFields,
		...commenterQueryFields,
		...annotationQueryFields,
		...bookQueryFields,
		...pagesQueryFields,
		...editionsQueryFields,
		...settingsQueryFields,
		...workQueryFields,
		...tenantsQueryFields,
		...keywordQueryFields,
		...referenceWorkQueryFields,
		...discussionCommentQueryFields,
		...commentQueryFields,
		...translationsQueryFields
	},
});

export default RootQuery;
