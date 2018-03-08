import {
	GraphQLString,
	GraphQLBoolean,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInputObjectType,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

/**
 * Settings model type
 * @type {GraphQLObjectType}
 */
const SettingsType = new GraphQLObjectType({
	name: 'SettingsType',
	description: 'Settings',
	fields: {
		_id: {
			type: GraphQLString,
		},
		name: {
			type: GraphQLString,
		},
		domain: {
			type: GraphQLString,
		},
		title: {
			type: GraphQLString,
		},
		subtitle: {
			type: GraphQLString,
		},
		footer: {
			type: GraphQLString,
		},
		emails: {
			type: GraphQLJSON,
		},
		tenantId: {
			type: GraphQLString,
		},
		works: {
			type: new GraphQLList(GraphQLJSON),
		},
		webhooksToken: {
			type: GraphQLString,
		},
		aboutURL: {
			type: GraphQLString,
		},
		homepageCover: {
			type: GraphQLJSON,
		},
		homepageIntroduction: {
			type: new GraphQLList(GraphQLJSON),
		},
		homepageIntroductionImage: {
			type: GraphQLJSON,
		},
		homepageIntroductionImageCaption: {
			type: GraphQLString,
		},
		discussionCommentsDisabled: {
			type: GraphQLBoolean,
		},
		introBlocks: {
			type: new GraphQLList(new GraphQLObjectType({
				name: 'IntroBlockType',
				fields: {
					title: {
						type: GraphQLString
					},
					text: {
						type: GraphQLString
					},
					linkURL: {
						type: GraphQLString,
					},

					linkText: {
						type: GraphQLString,
					},
				},
			})),
		}
	},
});

/**
 * Settings input type
 * @type {GraphQLInputObjectType}
 */
const SettingsInputType = new GraphQLInputObjectType({
	name: 'SettingsInputType',
	description: 'Settings',
	fields: {
		_id: {
			type: GraphQLString,
		},
		name: {
			type: GraphQLString,
		},
		domain: {
			type: GraphQLString,
		},
		title: {
			type: GraphQLString,
		},
		subtitle: {
			type: GraphQLString,
		},
		footer: {
			type: GraphQLString,
		},
		emails: {
			type: GraphQLJSON,
		},
		tenantId: {
			type: GraphQLString,
		},
		webhooksToken: {
			type: GraphQLString,
		},
		aboutURL: {
			type: GraphQLString,
		},
		homepageCover: {
			type: GraphQLJSON,
		},
		homepageIntroduction: {
			type: new GraphQLList(GraphQLJSON),
		},
		homepageIntroductionImage: {
			type: GraphQLJSON,
		},
		homepageIntroductionImageCaption: {
			type: GraphQLString,
		},
		discussionCommentsDisabled: {
			type: GraphQLBoolean,
		},
		introBlocks: {
			type: new GraphQLList(new GraphQLInputObjectType({
				name: 'IntroBlockInputType',
				fields: {
					title: {
						type: GraphQLString
					},
					text: {
						type: GraphQLString
					},
					linkURL: {
						type: GraphQLString,
					},
					linkText: {
						type: GraphQLString,
					},
				},
			})),
		}
	},
});

export { SettingsType, SettingsInputType };
