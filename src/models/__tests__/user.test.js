import mongoose from 'mongoose';

import {getURL} from '../../mongoose';
import User from '../user'; // variable name has to be the same as defined in model, eg. `Users` in `mongoose.model('Users', UserSchema); `

describe('Model - User ...', () => {

	beforeEach(() => {
		// check mongoose connection
		const options = {
			useMongoClient: true,
			keepAlive: 1
		};
		if (mongoose.connection.readyState === 0) {
			console.info('Testing on MongoDB host: ', getURL());
			mongoose.connect(getURL(), options);
		}
	});

	afterAll(async () => {
		await User.remove({});
		await mongoose.disconnect();
	});

	it('should be able to register a user', (done) => {
		const username = 'newUser';
		User.register({username}, 'password', async (err, user) => {
			if (err) { return done(err); }
			const registeredUser = await User.findByUsername(username).exec();
			expect(registeredUser.username).toBe(username);
			done();
		});
	});

});
