import { GraphQLObjectType } from 'graphql';

import projectMutationFields from './projects';
import collectionMutationFields from './collections';
import itemMutationFields from './items';
import annotationMutationFields from './annotations';
import bookMutationFields from './books';
import commenterMutationFields from './commenters';
import commentMutationFields from './comments';
import discussionCommentsMutationFields from './discussionComments';
import keywordsMutationFields from './keywords';
import pagesMutationFields from './pages';
import referenceWorksMutationFields from './referenceWorks';
import settingsMutationFields from './settings';
import tenantsMutationFields from './tenants';

/**
 * Root mutations
 * @type {GraphQLObjectType}
 */
const RootMutations = new GraphQLObjectType({
	name: 'RootMutationType',
	description: 'Root mutation object type',
	fields: {
		...projectMutationFields,
		...collectionMutationFields,
		...itemMutationFields,
		...annotationMutationFields,
		...bookMutationFields,
		...commenterMutationFields,
		...commentMutationFields,
		...discussionCommentsMutationFields,
		...keywordsMutationFields,
		...pagesMutationFields,
		...referenceWorksMutationFields,
		...settingsMutationFields,
		...tenantsMutationFields,
	},
});

export default RootMutations;
