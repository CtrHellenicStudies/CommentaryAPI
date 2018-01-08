/**
 * Queries for commenters
 */

import { GraphQLString, GraphQLID, GraphQLList } from 'graphql';

// types
import { CommenterType } from '../types/commenter';

// logic
import CommenterService from '../logic/Commenters/commenters';

const commenterQueryFields = {
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
			const commenters = commenterService.commentersQuery(tenantId);
		}
	},
};


export default commenterQueryFields;
