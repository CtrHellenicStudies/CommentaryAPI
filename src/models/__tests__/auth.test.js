import mongoose from 'mongoose';

import {getURL} from '../../mongoose';
import User from '.././user';

describe('Integration - Auth ...', () => {
	// SETUP & TEARDOWN
	beforeEach(() => {
		// check mongoose connection
		if (mongoose.connection.readyState === 0) {
			mongoose.connect(getURL());
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
		// RUN 
		const oneUser = await User.findOne();
		// CHECK
		expect(oneUser).toBeInstanceOf(User);
		expect(oneUser.toObject()).toHaveProperty('_id');
		expect(oneUser.toObject()).toHaveProperty('username');
	});

});
