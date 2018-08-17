import generateJWT from './jwt';
import providers from './providers';

// models
import User from '../../models/user';

// authentication
import { validateTokenOAuth1, validateTokenOAuth2 } from '../../authentication';

// email
import EmailManager from '../../email';

// lib
import getUserEmail from '../../lib/getUserEmail';
import logger from '../../lib/logger';


/**
 * Login user with password and username
 * @param  {Object} res      Express response object
 * @param  {String} username Username
 * @param  {String} password Password
 */
export const loginPWD = async (res, username, password) => {
	const user = await User.findOne({
		$or: [{
			username,
		}, {
			'emails.address': username,
		}],
	});

	if (user) {
		await user.authenticate(password, async (_, isValid, message) => {
			if (isValid) {
				return res.json(generateJWT(user));
			}

			// user document salt field check
			if (message.name === 'NoSaltValueStoredError') {
				const userWithResetToken = await User.generatePasswordResetToken(username);
				if (userWithResetToken && userWithResetToken.resetPasswordToken) {
					// send password reset email
					// For development purposes, don't send orpheus email
					await EmailManager.sendPasswordResetEmail(getUserEmail(userWithResetToken), userWithResetToken.resetPasswordToken);
					return res.json({ redirectTo: '/auth/update-for-v2' });
				}
				logger.error('Generate Password Reset Token Failed for user', user);
				return res.json({ error: 'Generate Password Reset Token Failed.' });
			}

			return res.status(401).send(message);
		});

	} else {
		return res.status(401).send({error: 'User not found'});
	}
};

/**
 * Login with OAuth v.2
 * @param  {Object} res      	Express response object
 * @param  {String} accessToken oAuth access token
 * @param  {String} network     Name of network (e.g. facebook)
 */
export const loginOAuth2 = async (res, accessToken, network) => {

	try {
		const { url, userIdField } = providers[network];
		const profile = await validateTokenOAuth2(accessToken, url);
		const user = await User.findByOAuth(profile[userIdField], network);
		if (user) {
			return res.json(generateJWT(user));
		}
		return res.status(401).send({error: 'User not found'});
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
};

/**
 * Login with OAuth v.1
 * @param  {Object} res      	Express response object
 * @param  {[type]} oauthToken       oAuth access token
 * @param  {[type]} oauthTokenSecret oAuth access secret
 * @param  {String} network     Name of network (e.g. facebook)
 */
export const loginOAuth1 = async (res, oauthToken, oauthTokenSecret, network) => {
	try {
		const { url, userIdField } = providers[network];
		const profile = await validateTokenOAuth1(network, oauthToken, oauthTokenSecret, url);
		const user = await User.findByOAuth(profile[userIdField], network);
		if (user) {
			return res.json(generateJWT(user));
		}
		return res.status(401).send({error: 'User not found'});
	} catch (err) {
		console.log('err', err);
		res.status(500).send();
	}
};
