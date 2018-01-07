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
		resolve(parent, { _id }, {token}) {
			const userService = new UserService({token});
			return userService.usersGet(_id).then(users => users);
		}
	},
	getAuthedUser: {
		type: UserType,
		description: 'Return a single users account by their login token',
		resolve(parent, _, { token }) {
			const userService = new UserService({token});
			return userService.getAuthedUser().then(user => user);
		}
	},
	userGetPublicById: {
		type: UserType,
		description: 'Return public information about a single user by their user Id',
		args: {
			_id: {
				type: GraphQLString,
			},
		},
		resolve(parent, { _id }, {token}) {
			const userService = new UserService({token});
			return userService.userGetPublicById(_id).then(user => user);
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
		resolve(parent, { userIds }, { token }) {
			const userService = new UserService({ token });
			return userService.usersGetPublicById(userIds).then(users => users);
		}
	},

};


export default userQueryFields;
