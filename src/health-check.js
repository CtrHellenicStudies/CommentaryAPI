const healthCheck = (req, res, next) => {

	if (req.path === '/') {
		res.status(200).send('OK');
	}

	next();

};

export default healthCheck;
