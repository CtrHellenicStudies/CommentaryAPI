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
},
{collection: 'referenceWorks'});
const ReferenceWorks = mongoose.model('referenceWorks', ReferenceWorksModel);


export default ReferenceWorks;
