/**
 * Queries for users
 */
import { GraphQLString, GraphQLList } from 'graphql';

// types
import UserType from '../types/user';

// logic
import UserService from '../logic/users';


const userQueryFields = {
	users: {
		type: new GraphQLList(UserType),
		description: 'Get list of users',
		args: {
			_id: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { _id }, { token }) {
			const userService = new UserService(token);
			const users = await userService.usersGet(_id);
			return users;
		},
	},
	getAuthedUser: {
		type: UserType,
		description: 'Return a single users account by their login token',
		async resolve (parent, _, { token }) {
			const userService = new UserService(token);
			const user = userService.getAuthedUser();
			return user;
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
