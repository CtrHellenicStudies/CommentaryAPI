import { GraphQLObjectType } from 'graphql';

import projectMutationFields from './projects';
import collectionMutationFields from './collections';
import itemMutationFields from './items';
import annotationMutationFields from './annotations';
import bookMutationFields from './books';
import commenterMutationFields from './commenters';
import commentMutationFields from './comments';
import discussionCommentsMutationFields from './discussionComments';
import editionMutationFields from './editions';
import keywordsMutationFields from './keywords';
import pagesMutationFields from './pages';
import referenceWorksMutationFields from './referenceWorks';
import settingsMutationFields from './settings';
import tenantsMutationFields from './tenants';
import textNodeMutationFields from './textNodes';
import translationsMutationFields from './translations';
import worksMutationFields from './works';

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
		...editionMutationFields,
		...keywordsMutationFields,
		...pagesMutationFields,
		...referenceWorksMutationFields,
		...settingsMutationFields,
		...tenantsMutationFields,
		...textNodeMutationFields,
		...translationsMutationFields,
		...worksMutationFields
	},
});

export default RootMutations;
