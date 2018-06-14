import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../../../app';
import { getURL } from '../../../mongoose';
import User from '../../../models/user';
import { loginPWD } from '../login';

describe('Integration - Authentication routes ...', () => {
	// SETUP & TEARDOWN
	const fakeRes = {json: raw => raw};

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

	// TESTS
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

	it('generateResetPassword should generate resetPasswordToken and resetPasswordExpires for a User instance.', async () => {
		// SETUP
		const username = 'testUserBeforeGeneratePasswordResetToken';
		const userBeforeGeneratePasswordResetToken = await new User({
			username: username,
		}).save();
		
		// RUN
		await User.generatePasswordResetToken(username);

		// CHECK
		const userAfterGeneratePasswordResetToken = await User.findOne({ username: username });
		expect(userAfterGeneratePasswordResetToken).toBeInstanceOf(User);
		expect(userAfterGeneratePasswordResetToken.toObject()).toHaveProperty('_id');
		expect(userAfterGeneratePasswordResetToken.toObject()).toHaveProperty('username');
		expect(userAfterGeneratePasswordResetToken.toObject()).toHaveProperty('resetPasswordToken');
		expect(userAfterGeneratePasswordResetToken.toObject()).toHaveProperty('resetPasswordExpires');
		
	});

	it('resetPassword should reset the password to the correct new password then remove resetPasswordToken and resetPasswordExpires', async (done) => {
		// SETUP
		const username = 'testUserResetPassword';
		const oldPassword = 'oldPassword';
		const newPassword = 'newPassword';
		const newUser = await new User({
			username,
		});
		// register a new user
		User.register(newUser, oldPassword, async (err, userRegistered) => {

			// RUN
			// generate password reset token
			const userWithToken = await User.generatePasswordResetToken(username);
			// reset password
			const userAfterReset = await User.resetPassword(userWithToken.resetPasswordToken, newPassword);

			// CHECK
			// login with new password
			userAfterReset.authenticate(newPassword, async (_, isValid, message) => {
				expect(isValid).toBeInstanceOf(User);
				expect(isValid.toObject()).toHaveProperty('_id');
				expect(isValid.toObject()).toHaveProperty('username');
				expect(isValid.toObject()).not.toHaveProperty('resetPasswordToken');
				expect(isValid.toObject()).not.toHaveProperty('resetPasswordExpires');
				done();
			});
		});
	});

	it('login of a User instance without Hash and Salt should trigger generateResetPassword for that User instance', async () => {
		// SETUP
		const username = 'testUserWithoutHashAndSalt';
		const password = '123';
		const userWithoutHashAndSalt = await new User({username, password}).save();

		// RUN
		const response = await request(app).post('/auth/login').send({username, password});

		// CHECK
		expect(response.status).toEqual(200);
		expect(response.body.passwordResetTokenGenerated).toBeTruthy();
	});

});
