module.exports = {
	development: {
		schema: { migration: {} },
		modelName: 'Migration',
		db: process.env.MONGOHQ_URL || 'mongodb://localhost/app_development',
		dbOptions: {}
	},
	test: {},
	production: {}
};
