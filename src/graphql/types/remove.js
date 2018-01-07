import { GraphQLObjectType, GraphQLID } from 'graphql';


const RemoveType = new GraphQLObjectType({
	name: 'RemoveType',
	fields: {
		_id: {
			type: GraphQLID,
		},
	},
});


export default RemoveType;
