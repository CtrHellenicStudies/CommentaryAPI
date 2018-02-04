import mongoose, { Promise } from 'mongoose';

import PermissionsService from './PermissionsService';
import User from '../../models/user';
import { AuthenticationError } from '../errors/index';

/**
 * Logic-layer service for dealing with users
 */
export default class UserService extends PermissionsService {

	/**
	 * Get users (admin method)
	 * @param {string} _id - id of user
	 * @param {string} tenantId - id of tenants
	 * @returns {Object[]} array of users
	 */
	usersGet(id, tenantId) {
		const args = {};

		if (id) {
			args._id = mongoose.Types.ObjectId(id);
		}
		if (tenantId) {
			args.tenantId = tenantId;
		}
		return User.find(args, {
			_id: 1,
			username: 1,
			emails: 1,
			profile: 1,
			services: 1,
			subscriptions: 1,
			roles: 1,
			highlightingPreference: 1,
			canAnnotateBooks: 1,
			authorOfBooks: 1,
			canEditCommenters: 1,
			recentPositions: 1,
		}).sort({
			'profile.name': 1,
			'emails.address': 1,
			username: 1,
		}).exec();

	}

	/**
	 * Update a user
	 * @param {string} _id - id of user
	 * @param {Object} user - user to update
	 * @returns {Object} updated user record
	 */
	userUpdate(_id, user) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejected) {
				User.update({_id: _id}, user, function(err, updated) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(updated);
				});
			});
		}
		throw new AuthenticationError();
	}
	
	/**
	 * Remove a user
	 * @param {string} userId - id of user
	 * @returns {boolean} result from mongo orm remove
	 */
	userRemove(userId) {
		if (this.userIsAdmin) {
			return User.find({_id: userId}).remove();
		}
		throw new AuthenticationError();
	}

	/**
	 * Get the user information of the user currently logged in to Meteor
	 * @returns {Object} the user data for the currently logged in user
	 */
	getAuthedUser() {
		return this.user;
	}

	/**
	 * Get a user's public information by their id
	 * @param {string} _id - id of user
	 * @returns {Object} the user data
	 */
	userGetPublicById(_id) {
		return User.findOne(
			{
				_id,
			},
			{
				username: 1,
				profile: 1,
				services: 1,
				subscriptions: 1,
				roles: 1,
				highlightingPreference: 1,
				canAnnotateBooks: 1,
				authorOfBooks: 1,
				canEditCommenters: 1,
				recentPositions: 1,
			}).exec();
	}

	/**
	 * Get multiple users' public information by their id
	 * @param {string[]} userIds - an array of user ids
	 * @returns {Object[]} array of user data
	 */
	usersGetPublicById(userIds) {
		return User.find(
			{
				_id: {
					$in: userIds,
				},
			},
			{
				username: 1,
				profile: 1,
				services: 1,
				subscriptions: 1,
				roles: 1,
				highlightingPreference: 1,
				canAnnotateBooks: 1,
				authorOfBooks: 1,
				canEditCommenters: 1,
				recentPositions: 1,
			}
		).sort({
			'profile.name': 1,
			'emails.address': 1,
			username: 1,
		}).exec();

	}

	/**
	 * Update the most recent position of given users
	 * @param {Object} position - position information about where a user was most
	 *    recently reading
	 * @returns {Object} updated user record
	 */
	userUpdatePosition(position) {
		if (!this.user) {
			throw new Error('recent-position-update', 'not-logged-in');
		}

		let recentPositions = this.user.recentPositions || [];
		const positionLinkIsInRecentPositions = false;

		if (recentPositions.length > 10) {
			recentPositions = recentPositions.slice(1);
		}
		recentPositions.push(position);
		return new Promise(function(resolve, rejected) {
			User.findOne({id: this.user._id}).exec().then(function(user) {
				user.recentPositions = recentPositions;
				User.update({_id: this.user._id}, user, function(err, updated) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(updated);
				});
			});
		});
	}
}
