import mongoose from 'mongoose';

const ReferenceWorksModel = new mongoose.Schema({
	title: {
		type: String,
		optional: true,
	},

	slug: {
		type: String,
		max: 200,
		optional: true,
	},

	tenantId: {
		type: String,
		optional: true,
	},

	link: {
		type: String,
		optional: true,
	},

	authors: {
		type: [String],
		optional: true,
	},

	coverImage: {
		type: String,
		optional: true,
	},

	date: {
		type: Date,
		optional: true,
	},

	urnCode: {
		type: String,
		optional: true,
	},

	description: {
		type: String,
		optional: true,
	},

	citation: {
		type: String,
		optional: true,
	},
});
const ReferenceWorks = mongoose.model('ReferenceWorks', ReferenceWorksModel);

ReferenceWorks.attachBehaviour('timestampable', {
	createdAt: 'created',
	createdBy: 'createdBy',
	updatedAt: 'updated',
	updatedBy: 'updatedBy'
});

export default ReferenceWorks;
