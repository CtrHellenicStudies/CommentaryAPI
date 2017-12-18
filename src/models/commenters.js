import mongoose from 'mongoose';

const CommentersModel = new mongoose.Schema({
	_id: {
		type: String,
	},

	wordpressId: {
		type: Number,
		optional: true,
	},

	tenantId: {
		type: String,
		optional: true,
	},

	name: {
		type: String,
		optional: true,
		max: 255,
	},

	slug: {
		type: String,
		max: 200,
		optional: true,
	},

	avatar: new mongoose.Schema({
		src: {
			type: String,
			optional: true,
		},
	
		filename: {
			type: String,
			optional: true,
		},
	
		type: {
			type: String,
			optional: true,
		},
	
		size: {
			type: Number,
			optional: true,
		},
	
		directive: {
			type: String,
			optional: true,
		},
	
		key: {
			type: String,
			optional: true,
		},
	}),
	bio: {
		type: String,
		optional: true,
	},

	isAuthor: {
		type: Boolean,
		optional: true,
	},

	tagline: {
		type: String,
		optional: true,
	},

	featureOnHomepage: {
		type: Boolean,
		optional: true,
	},

	nCommentsTotal: {
		type: Number,
		optional: true,
	},

	nCommentsWorks: {
		type: [Object],
		optional: true,
		blackbox: true,
	},

	nCommentsIliad: {
		type: Number,
		optional: true,
	},

	nCommentsOdyssey: {
		type: Number,
		optional: true,
	},

	nCommentsHymns: {
		type: Number,
		optional: true,
	},

	nCommentsKeywords: {
		type: [Object],
		optional: true,
	},

	'nCommentsKeywords.$.title': {
		type: String,
		optional: true,
	},

	'nCommentsKeywords.$.slug': {
		type: String,
		optional: true,
	},

	'nCommentsKeywords.$.count': {
		type: Number,
		optional: true,
	},
});
const Commenters = mongoose.model('Commenters', CommentersModel);

export default Commenters;
export { CommentersModel};
