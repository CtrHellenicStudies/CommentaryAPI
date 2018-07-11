import mongoose from 'mongoose';
import shortid from 'shortid';

import LemmaCitation from './lemmaCitation';


const KeywordsModel = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},

	title: {
		type: String,
	},

	slug: {
		type: String,
		max: 200,
		optional: true,
		autoform: {
			type: 'hidden',
			label: false,
		},
	},

	description: {
		type: String,
		optional: true,
	},

	descriptionRaw: {
		type: String,
		optional: true,
	},

	type: {
		type: String,
		optional: true,
		defaultValue: 'word',
	},

	count: {
		type: Number,
		optional: true,
	},

	nLines: {
		type: Number,
		optional: true,
	},

	tenantId: {
		type: String,
		optional: true,
	},

	lemmaCitation: {
		type: LemmaCitation,
	},
});

const Keywords = mongoose.model('Keywords', KeywordsModel);

export default Keywords;
export { KeywordsModel };
