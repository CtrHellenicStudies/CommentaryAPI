import mongoose from 'mongoose';
import Editions from './editions';

import { WorksModel } from './works';
import { SubworksModel } from './subworks';


const TextNodesModel = new mongoose.Schema({
	tenantId: {
		type: String,
	},
	text: [new mongoose.Schema({
		n: {
			type: Number,
		},
		text: {
			type: String,
		},
		html: {
			type: String,
		},
		edition: {
			type: String,
		},
	})],
	work: {
		type: WorksModel,
	},
	subwork: {
		type: SubworksModel,
	},
	relatedPassages: {
		type: [Object],
	},
},
{collection: 'textNodes'});

const TextNodes = mongoose.model('TextNodes', TextNodesModel);

export default TextNodes;
