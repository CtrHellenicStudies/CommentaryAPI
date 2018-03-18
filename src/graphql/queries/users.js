/**
 * Queries for users
 */
import { GraphQLString, GraphQLList, GraphQLID } from 'graphql';

// types
import UserType from '../types/user';

// logic
import UserService from '../logic/users';


const userQueryFields = {
	users: {
		type: new GraphQLList(UserType),
		description: 'Get list of users',
		args: {
			id: {
				type: GraphQLID,
			},
			tenantId: {
				type: GraphQLString
			},
		},
		async resolve (parent, { id, tenantId }, { token }) {
			const userService = new UserService(token);
			const users = await userService.usersGet(id, tenantId);
			return users;
		},
	},
	userProfile: {
		type: UserType,
		description: 'Get user document for currently signed-in user',
		async resolve(obj, _, { token }) {
			const userService = new UserService(token);
			return await userService.getProfile();
		},
	},
	userGetPublicById: {
		type: UserType,
		description: 'Return public information about a single user by their user Id',
		args: {
			_id: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { _id }, { token }) {
			const userService = new UserService(token);
			const user = await userService.userGetPublicById(_id);
			return user;
		}
	},
	usersGetPublicById: {
		type: new GraphQLList(UserType),
		description: 'Return public information about a single user by their user Id',
		args: {
			userIds: {
				type: new GraphQLList(GraphQLString),
			},
		},
		async resolve (parent, { userIds }, { token }) {
			const userService = new UserService({ token });
			const users = await userService.usersGetPublicById(userIds);
			return users;
		}
	},

};


export default userQueryFields;
