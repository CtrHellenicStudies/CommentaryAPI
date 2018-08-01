const getUserEmail = (user) => {
	let email = user.username;

	if (user.email) {
		email = user.email;
	} else if (user.emails && user.emails.length) {
		email = user.emails[0].address;
	}

	return email;
};

export default getUserEmail;
