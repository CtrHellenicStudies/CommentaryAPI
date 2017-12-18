import mongoose from 'mongoose';

import { WorksModel } from './works';
import { SubworksModel } from './subworks';

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
		type: WorksModel,
		optional: true
	},
	subwork: {
		type: SubworksModel,
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
},
{collection: 'translationNodes'});
const TranslationNodes = mongoose.model('TranslationNodes', TranslationNodesModel);

export default TranslationNodes;
