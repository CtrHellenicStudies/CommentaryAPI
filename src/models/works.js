import mongoose from 'mongoose';

import Subworks from './subworks';


const WorksModel = new mongoose.Schema({
	title: {
		type: String,
	},
	tenantId: {
		type: String,
		optional: true,
	},
	tlgCreator: {
		type: String,
		optional: true,
	},
	tlg: {
		type: String,
		optional: true,
	},
	slug: {
		type: String,
		optional: true,
	},
	order: {
		type: Number,
		optional: true,
	},
	nComments: {
		type: Number,
		optional: true,
		min: 0,
	},
	subworks: {
		type: [Subworks.schema],
		optional: true,
	},
});
const Works = mongoose.model('Works', WorksModel);
Works.friendlySlugs('title');

Works.attachBehaviour('timestampable', {
	createdAt: 'created',
	createdBy: 'createdBy',
	updatedAt: 'updated',
	updatedBy: 'updatedBy'
});

export default Works;
