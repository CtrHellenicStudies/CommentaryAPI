import mongoose from 'mongoose';

const EditionsModel = new mongoose.Schema({
	_id: {
		type: String
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
