/**
 * Queries for textNodes
 */
import { GraphQLID, GraphQLList, GraphQLInt, GraphQLString, } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

// types
import { TextNodeType } from '../types/textNode';

// logic
import TextNodeService from '../logic/TextNodes/textNodes';


const textNodeQueryFields = {
	textNodes: {
		type: new GraphQLList(TextNodeType),
		description: 'List textNodes for reading environment',
		args: {
			_id: {
				type: GraphQLID,
			},
			tenantId: {
				type: GraphQLID,
			},
			limit: {
				type: GraphQLInt,
			},
			skip: {
				type: GraphQLInt,
			},
			// urn: {
			// 	type: GraphQLJSON,
			// },
			workSlug: {
				type: GraphQLString,
			},
			subworkN: {
				type: GraphQLInt,
			},
			lineFrom: {
				type: GraphQLInt,
			},
			lineTo: {
				type: GraphQLInt,
			},
			editionId: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { _id, tenantId, limit, skip, workSlug, subworkN, editionId, lineFrom, lineTo }, { token }) {
			const textNodeService = new TextNodeService(token);
			const textNodes = await textNodeService.textNodesGet(_id, tenantId, limit, skip, workSlug, subworkN, editionId, lineFrom, lineTo);

			return textNodes;
		},
	},
};

export default textNodeQueryFields;
