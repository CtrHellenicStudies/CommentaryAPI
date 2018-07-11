import mongoose from 'mongoose';
import shortid from 'shortid';

const EditionsModel = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},
	title: {
		type: String
	},
	slug: {
		type: String
	},
	multiLine: {
		type: [String]
	},
});

const Editions = mongoose.model('Editions', EditionsModel);

export default Editions;
