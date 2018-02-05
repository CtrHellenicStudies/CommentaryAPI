import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// models
import User from '../../models/user';


const setupJWTStrategy = (app) => {
	// JWT strategy
	const JWTOptions = {
		jwtFromRequest: ExtractJwt.fromAuthHeader(),
		secretOrKey: process.env.JWT_SECRET,
	};

	// Could be made faster with Redis loader if need be
	// http://gitlab.archimedes.digital/archimedes/orpheus-api/blob/master/src/authentication/strategies/jwt.js#L11
	passport.use(new JwtStrategy(JWTOptions, async (jwtPayload, done) => {
		try {
			const user = await User.findOne({ _id: jwtPayload._id });

			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		} catch (err) {
			return done(err, false);
		}
	}));
};

export default setupJWTStrategy;
