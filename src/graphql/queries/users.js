/**
 * Queries for users
 */
import { GraphQLString, GraphQLList } from 'graphql';

// types
import { UserType } from '../types/models/user';

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
			return userService.usersGet(_id).then(function(users) {
				return users;
			});
		}
	},
	getAuthedUser: {
		type: UserType,
		description: 'Return a single users account by their login token',
		resolve(parent, {}, { token }) {
			const userService = new UserService({token});
			return userService.getAuthedUser().then(function(user){
				return user;
			});
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
			return userService.userGetPublicById(_id).then(function(user) {
				return user;
			});
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
			return userService.usersGetPublicById(userIds).then(function(users) {
				return users;
			});
		}
	},

};


export default userQueryFields;
