import mongoose from 'mongoose';
import shortid from 'shortid';

const DiscussionCommentsModel = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},
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
},
{collection: 'discussionComments'});
const DiscussionComments = mongoose.model('DiscussionComments', DiscussionCommentsModel);

export default DiscussionComments;
export { DiscussionCommentsModel };
