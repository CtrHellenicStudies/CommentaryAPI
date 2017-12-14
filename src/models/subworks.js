import mongoose from 'mongoose';

const SubworksModel = new mongoose.Schema({
	title: {
		type: String,
	},
	slug: {
		type: String,
		optional: true,
	},

	n: {
		type: Number,
	},

	tlgNumber: {
		type: String,
		optional: true,
	},

	nComments: {
		type: Number,
		optional: true,
	},

	commentHeatmap: {
		type: [Object],
		optional: true,
	},
	'commentHeatmap.$.n': {
		type: Number,
	},
	'commentHeatmap.$.nComments': {
		type: Number,
	},
});
const Subworks = mongoose.model('Subworks', SubworksModel);
Subworks.friendlySlugs('title');

Subworks.attachBehaviour('timestampable', {
	createdAt: 'created',
	createdBy: 'createdBy',
	updatedAt: 'updated',
	updatedBy: 'updatedBy'
});

export default Subworks;