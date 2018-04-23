import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import DataLoader from 'dataloader';

// models
import User from '../models/user';

// strategies
import setupJWTStrategy from './strategies/jwt';
import validateTokenOAuth1 from './strategies/oauth1';
import validateTokenOAuth2 from './strategies/oauth2';


export default function authSetup(app, redisClient) {

	// setup JWT strategy
	setupJWTStrategy(app, redisClient);


	// PASSPORT setup
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	app.use(passport.initialize());
}


/**
 * Authentication Middleware
 */
export function jwtAuthenticate(req, res, next) {
	passport.authenticate(['jwt'], {
		session: false
	}, (err, user, info) => {
		if (err) {
			return next(err);
		}
		req.user = user || null;
		next();
	})(req, res, next);
}

/**
 * Password reset link used in password reset emails
 */
export function generatePasswordResetLink(passwordResetToken) {
	// TODO: put ahcip reset password url in env vars
	const resetPasswordAHCIPRoute = 'http://ahcip.chs.local/reset-password';
	return `${resetPasswordAHCIPRoute}?token=${passwordResetToken}`;
}

// export strategies
export { validateTokenOAuth1, validateTokenOAuth2 };
