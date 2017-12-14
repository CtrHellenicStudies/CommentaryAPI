import { GraphQLObjectType } from 'graphql';

import projectQueryFields from './projects';
import commenterQueryFields from './commenters';
import userQueryFields from './users';
import miradorQueryFields from './miradorManifests';
import annotationQueryFields from './annotations';

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
		...annotationQueryFields
	},
});

export default RootQuery;
