import mongoose from 'mongoose';
import shortid from 'shortid';

const BooksModel = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
	title: {
		type: String
	},
	slug: {
		type: String,
		optional: true,
	},
	author: {
		type: String,
		optional: true,
	},
	authorURN: {
		type: String,
		optional: true,
	},
	chapters: {
		type: [Object],
		optional: true,
	},
	'chapters.$.url': {
		type: String,
		optional: true,
	},
	'chapters.$.title': {
		type: String,
		optional: true,
	},
	'chapters.$.n': {
		type: Number,
		optional: true,
	},
	'chapters.$.slug': {
		type: String,
		optional: true,
	},
	coverImage: {
		type: String,
		optional: true,
	},
	year: {
		type: Number,
		optional: true,
	},
	publisher: {
		type: String,
		optional: true,
	},
	citation: {
		type: String,
		optional: true,
	},
	tenantId: {
		type: String,
		optional: true,
	},
});
const Books = mongoose.model('Books', BooksModel);

export default Books;
