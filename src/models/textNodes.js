import mongoose from 'mongoose';
import Editions from './editions';


const TextNodesModel = new mongoose.Schema({
	tenantId: {
		type: String,
		optional: true,
	},
	text: {
		type: [Object],
	},
	'text.$.n': {
		type: Number,
	},
	'text.$.text': {
		type: String,
	},
	'text.$.html': {
		type: String,
	},
	'text.$.edition': {
		type: String,
	},
	work: {
		type: Object,
	},
	'work.slug': {
		type: String,
	},
	subwork: {
		type: Object,
	},
	'subwork.title': {
		type: String,
	},
	'subwork.n': {
		type: Number,
	},
	relatedPassages: {
		type: [Object],
	},
});

const TextNodes = mongoose.model('TextNodes', TextNodesModel);

export default TextNodes;
