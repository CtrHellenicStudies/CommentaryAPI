/**
 * Queries for commenters
 */

import { GraphQLString, GraphQLID, GraphQLList } from 'graphql';

// types
import { CommenterType } from '../types/commenter';

// logic
import CommenterService from '../logic/commenters/commenters';

const commenterQueryFields = {
	commenter: {
		type: CommenterType,
		description: 'Get a commenter',
		args: {
			id: {
				type: GraphQLString,
			},
			slug: {
				type: GraphQLString,
			},
			tenantId: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { id, slug, tenantId }, { token }) {
			const commenterService = new CommenterService(token);
			const commenter = await commenterService.getCommenter(id, slug, tenantId);
			return commenter;
		},
	},
	commenters: {
		type: new GraphQLList(CommenterType),
		description: 'Get list of all commenters',
		args: {
			tenantId: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { tenantId }, { token }) {
			const commenterService = new CommenterService(token);
			const commenters = await commenterService.getCommenters(tenantId);
			return commenters;
		}
	},
};


export default commenterQueryFields;
