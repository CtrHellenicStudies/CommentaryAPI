// models
import User from '../../models/user';

// email
import EmailManager from '../../email';

// lib
import getUserEmail from '../../lib/getUserEmail';
import logger from '../../lib/logger';

export const generateResetPassword = async (res, username) => {

	try {
		const user = await User.generatePasswordResetToken(username);
		if (user && user.resetPasswordToken) {
			// send password reset email
			// For development purposes, don't send orpheus email
			const emailRes = await EmailManager.sendPasswordResetEmail(getUserEmail(user), user.resetPasswordToken);
			return res.json({ 
				ok: true,
				emailRes: emailRes,
			});
		}
		return res.json({ ok: false });
	} catch (err) {
		logger.error('err', err);
		return res.status(500).send();
	}
};

export const resetPassword = async (res, resetPasswordToken, newPassword) => {

	try {
		const user = await User.resetPassword(resetPasswordToken, newPassword);
		if (user) {
			return res.json({ ok: true });
		}
		return res.json({ ok: false });
	} catch (err) {
		logger.error('err', err);
		if (err.passwordStrength) return res.status(200).send(err);
		return res.status(500).send();
	}
};
