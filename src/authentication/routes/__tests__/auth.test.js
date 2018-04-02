import mongoose from 'mongoose';

import {getURL} from '../../../mongoose';
import User from '../../../models/user';

describe('Integration - Authentication routes ...', () => {
	// SETUP & TEARDOWN
	beforeEach(() => {
		// check mongoose connection
		const options = {
			useMongoClient: true
		};
		if (mongoose.connection.readyState === 0) {
			mongoose.connect(getURL(), options);
			console.info('Connected to MongoDB host: ', getURL());
		}
	});
	afterEach(() => {
		// TODO: clean up
	});

	afterAll((done) => {
		mongoose.disconnect();
		done();
	});

	it('should be able to fetch one user', async () => {
		// SETUP
		const testUser = new User({
			username: 'testUser',
		});
		await testUser.save();

		// RUN 
		const oneUser = await User.findOne();
		
		// CHECK
		expect(oneUser).toBeInstanceOf(User);
		expect(oneUser.toObject()).toHaveProperty('_id');
		expect(oneUser.toObject()).toHaveProperty('username');
	});

});
