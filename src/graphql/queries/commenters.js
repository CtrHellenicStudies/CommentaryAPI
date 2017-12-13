/**
 * Queries for commenters
 */

import { GraphQLString, GraphQLID, GraphQLList } from 'graphql';

// types
import { CommenterType } from '../types/models/commenter';

// logic
import CommentersService from '../logic/Commenters/commenters';

const commenterQueryFields = {
	commenters: {
		type: new GraphQLList(CommenterType),
		description: 'Get list of all commenters',
		args: {
			tenantId: {
				type: GraphQLString,
			},
		},
		resolve: (parent, { tenantId }, {token}) => {
			CommentersService.commentersQuery(tenantId, function(){}).then(function(commenters){console.log(commenters);});
		},
	},
};


export default commenterQueryFields;
