import mongoose from 'mongoose';
import shortid from 'shortid';

const PagesModel = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},
	title: {
		type: String,
	},
	subtitle: {
		type: String,
		optional: true,
	},
	headerImage: {
		type: [String],
		optional: true,
	},
	slug: {
		type: String,
		optional: true,
	},
	byline: {
		type: String,
		optional: true,
	},
	tenantId: {
		type: String,
		optional: true,
	},
	content: {
		type: String,
		optional: true,
	},
});

const Pages = mongoose.model('Pages', PagesModel);

export default Pages;
