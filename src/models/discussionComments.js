import mongoose from 'mongoose';

const DiscussionCommentsModel = new mongoose.Schema({
	userId: {
		type: String,
		optional: true,
	},
	content: {
		type: String,
		optional: true,
	},
	parentId: {
		type: String,
		optional: true,
	},
	commentId: {
		type: String,
		optional: true,
	},
	status: {
		type: String,
		optional: true,
	},
	votes: {
		type: Number,
		optional: true,
	},
	voters: {
		type: [String],
		optional: true,
	},
	reported: {
		type: Number,
		optional: true,
	},
	usersReported: {
		type: [String],
		optional: true,
	},
	tenantId: {
		type: String,
		optional: true,
	},
});
const DiscussionComments = mongoose.model('DiscussionComments', DiscussionCommentsModel);

DiscussionComments.attachBehaviour('timestampable', {
	createdAt: 'created',
	createdBy: 'createdBy',
	updatedAt: 'updated',
	updatedBy: 'updatedBy'
});

export default DiscussionComments;
