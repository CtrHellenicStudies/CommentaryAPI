import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInputObjectType
} from 'graphql';


const LemmaCitationType = new GraphQLObjectType({
	name: 'LemmaCitationType',
	fields: {
		ctsNamespace: {
			type: GraphQLString
		},
		textGroup: {
			type: GraphQLString
		},
		work: {
			type: GraphQLString
		},
		passageFrom: {
			type: new GraphQLList(GraphQLInt),
		},
		passageTo: {
			type: new GraphQLList(GraphQLInt),
		},
		subreferenceIndexFrom: {
			type: GraphQLInt,
		},
		subreferenceIndexTo: {
			type: GraphQLInt,
		},
	},
});

const LemmaCitationInputType = new GraphQLInputObjectType({
	name: 'LemmaCitationInputType',
	fields: {
		ctsNamespace: {
			type: GraphQLString
		},
		textGroup: {
			type: GraphQLString
		},
		work: {
			type: GraphQLString
		},
		passageFrom: {
			type: new GraphQLList(GraphQLInt)
		},
		passageTo: {
			type: new GraphQLList(GraphQLInt)
		},
		subreferenceIndexFrom: {
			type: GraphQLInt,
		},
		subreferenceIndexTo: {
			type: GraphQLInt,
		},
	},
});

export default LemmaCitationType;
export { LemmaCitationInputType };
