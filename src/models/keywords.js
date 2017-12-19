import mongoose from 'mongoose';

import { WorksModel } from './works';
import { SubworksModel } from './subworks';

const KeywordsModel = new mongoose.Schema({
	_id: {
		type: String,
		optional: true,
	},

	wordpressId: {
		type: Number,
		optional: true,
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

	work: {
		type: WorksModel,
		optional: true,
	},

	subwork: {
		type: SubworksModel,
		optional: true,
	},

	lineFrom: {
		type: Number,
		optional: true,
	},

	lineTo: {
		type: Number,
		optional: true,
	},

	lineLetter: {
		type: String,
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
});

const Keywords = mongoose.model('Keywords', KeywordsModel);

export default Keywords;
export { KeywordsModel };
