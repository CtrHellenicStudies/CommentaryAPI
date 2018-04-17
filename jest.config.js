// dotenv
const dotenvSetup = require('./src/dotenv');

dotenvSetup();

module.exports = {
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'!**/node_modules/**'
	]
};
