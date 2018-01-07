import {
	GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLInt,
	GraphQLBoolean,
} from 'graphql';
import createType from 'mongoose-schema-to-graphql';

// models
import Project from '../../models/project';

// logic
import ProjectService from '../logic/projects';
import UserService from '../logic/users';

// types
import UserType from './user';


const config = {
	name: 'ProjectType',
	description: 'Project base query type',
	class: 'GraphQLObjectType',
	schema: Project.schema,
	extend: {
		users: {
			type: new GraphQLList(new GraphQLObjectType({
				name: 'ProjectUsersType',
				fields: {
					user: {
						type: UserType,
						resolve(projectUser, args, { token }) {
							const userService = new UserService(token);
							return userService.getUser({ _id: projectUser.userId });
						}
					},
					role: {
						type: GraphQLString,
					}
				}
			})),
			resolve(parent, args, { token }) {
				return parent.users;
			}
		},
		userIsAdmin: {
			type: GraphQLBoolean,
			resolve(parent, args, { token }) {
				const userService = new UserService(token);
				return userService.userIsAdmin({ project: parent });
			}
		},
	},
};

const configInput = {
	name: 'ProjectInputType',
	description: 'Project Schema base create input type',
	class: 'GraphQLInputObjectType',
	schema: Project.schema,
	exclude: [],
};

const ProjectType = createType(config);
const ProjectInputType = createType(configInput);

export default ProjectType;
export { ProjectInputType };
