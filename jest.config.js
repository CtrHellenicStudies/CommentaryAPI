// dotenv
const dotenvSetup = require('./src/dotenv');

dotenvSetup();

module.exports = {
	testURL: 'http://localhost', // temp fix for jsdom bug reported on 7/25/2018 https://github.com/facebook/jest/issues/6766
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'!**/node_modules/**'
	]
};
