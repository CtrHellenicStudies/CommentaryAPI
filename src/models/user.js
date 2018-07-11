import crypto from 'crypto';
import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';
import passportLocalMongoose from 'passport-local-mongoose';
import shortid from 'shortid';

const Schema = mongoose.Schema;

/**
 * User base schema
 * @type {Schema}
 */
const UserSchema = new Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},
	username: String,
	name: String,
	email: String,
	bio: String,
	password: String,
	canEditCommenters: [String],
	profile: new Schema({
		name: String,
		biography: String,
		twitter: String,
		linkedIn: String,
		facebook: String,
		avatarUrl: String,
	}),
	oauthIds: [{
		network: String,
		id: String,
	}],
	verified: {
		type: Boolean,
		defualt: false,
	},
	roles: [String],
	resetPasswordToken: String,
	resetPasswordExpires: Date
});


// add password hash and salt
UserSchema.plugin(passportLocalMongoose);

// add timestamp (createdAt, updatedAt)
UserSchema.plugin(timestamp);

// Statics
// this method is needed for dataloader to work
UserSchema.statics.findById = function findById(_id, cb) {
	return User.findOne({ _id }, cb); // eslint-disable-line
};

UserSchema.statics.findByOAuth = function findByOAuth(id, network, cb) {
	return User.findOne({ oauthIds: { $elemMatch: { network, id } } }, cb); // eslint-disable-line
};

UserSchema.statics.createOAuth = async function createOAuth({ id, network }, cb) {
	const user = await User.findByOAuth(id, network); // eslint-disable-line
	if (user) return null;
	return User.create({ oauthIds: [{ id, network }] }, cb); // eslint-disable-line
};

UserSchema.statics.generatePasswordResetToken = async function generatePasswordResetToken(username) {
	try {
		const buf = await crypto.randomBytes(48);
		const token = buf.toString('hex');
		return User.findOneAndUpdate(// eslint-disable-line
			{ username },
			{
				resetPasswordToken: token,
				resetPasswordExpires: Date.now() + 3600000, // 1 hour
			},
			{new: true}
		);
	} catch (err) {
		throw err;
	}
};

UserSchema.statics.resetPassword = async function resetPassword(resetPasswordToken, newPassword) {
	try {
		const user = await User.findOne({ // eslint-disable-line
			resetPasswordToken,
			resetPasswordExpires: {
				$gt: Date.now()
			}
		}); // eslint-disable-line
		if (user) {
			// second value must be passed - workaround for model bug
			return new Promise((resolve, reject) => {
				user.setPassword(newPassword, (err, userWithNewPassword) => {
					if (err) reject(err);
					// remove PasswordResetToken and Expires after a successful reset
					userWithNewPassword.resetPasswordToken = undefined;
					userWithNewPassword.resetPasswordExpires = undefined;
					userWithNewPassword.save((saveErr) => {
						if (saveErr) reject(saveErr);
						resolve(userWithNewPassword);
					});
				});
			});
		}
		return null;

	} catch (err) {
		throw err;
	}
};

UserSchema.pre('save', function(next) {
	if (!this._id) {
		// this will become the hex representation (String type, 24 bytes without timestamp) of the 12 bytes ObjectId object
		// which is less good
		// but to be backward compatible with user _id created before v2, it has to be String type
		// until we do a migration on user table to make sure all user._id are ObjectID type
		this._id = mongoose.Types.ObjectId();
	}
	next();
});


/**
 * User mongoose model
 * @type {Object}
 */
const User = mongoose.model('Users', UserSchema);
export default User;
export { UserSchema };
