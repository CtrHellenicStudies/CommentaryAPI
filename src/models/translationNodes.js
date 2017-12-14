import mongoose from 'mongoose';

const TranslationNodesModel = new mongoose.Schema({
	tenantId: {
		type: String,
		optional: true
	},
	created: {
		type: Date,
		optional: true
	},
	updated: {
		type: Date,
		optional: true
	},
	author: {
		type: String,
		optional: true
	},
	work: {
		type: String,
		optional: true
	},
	subwork: {
		type: Number,
		optional: true
	},
	n: {
		type: Number,
		optional: true
	},
	text: {
		type: String,
		optional: true
	}
});
const TranslationNodes = mongoose.model('TranslationNodes', TranslationNodesModel);

export default TranslationNodes;
