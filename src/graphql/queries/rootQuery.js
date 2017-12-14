import { GraphQLObjectType } from 'graphql';

import projectQueryFields from './projects';
import commenterQueryFields from './commenters';
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
		...keywordQueryFields
	},
});

export default RootQuery;
