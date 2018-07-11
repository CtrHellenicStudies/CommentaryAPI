import mongoose from 'mongoose';
import shortid from 'shortid';

const SettingsModel = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},
	name: {
		type: String,
	},
	domain: {
		type: String,
	},
	title: {
		type: String,
	},
	subtitle: {
		type: String,
		optional: true,
	},
	footer: {
		type: String,
	},
	emails: {
		type: Object,
	},
	'emails.from': {
		type: String,
	},
	'emails.contact': {
		type: String,
	},
	tenantId: {
		type: String,
	},
	works: {
		type: [Object],
		optional: true,
	},

	webhooksToken: {
		optional: true,
		type: String,
	},

	homepageCover: {
		optional: true,
		type: Object,
	},

	'homepageCover.filename': {
		type: String,
		optional: true,
	},

	'homepageCover.src': {
		type: String,
		optional: true,
	},

	'homepageCover.type': {
		type: String,
		optional: true,
	},

	'homepageCover.size': {
		type: Number,
		optional: true,
	},

	homepageIntroduction: {
		optional: true,
		type: [Object],
	},

	homepageIntroductionImage: {
		optional: true,
		type: Object,
	},

	'homepageIntroductionImage.src': {
		type: String,
		optional: true,
	},

	'homepageIntroductionImage.filename': {
		type: String,
		optional: true,
	},

	'homepageIntroductionImage.type': {
		type: String,
		optional: true,
	},

	'homepageIntroductionImage.size': {
		type: Number,
		optional: true,
	},

	'homepageIntroductionImage.directive': {
		type: String,
		optional: true,
	},

	'homepageIntroductionImage.key': {
		type: String,
		optional: true,
	},

	homepageIntroductionImageCaption: {
		optional: true,
		type: String,
	},
	introBlocks: {
		optional: true,
		type: [new mongoose.Schema({
			title: {
				type: String
			},
			text: {
				type: String
			},
			linkURL: {
				type: String,
				optional: true,
			},

			linkText: {
				type: String,
				optional: true,
			}
		})]
	},
	discussionCommentsDisabled: {
		type: Boolean,
		optional: true,
	},

	aboutURL: {
		type: String,
		optional: true,
	},

});
const Settings = mongoose.model('Settings', SettingsModel);

export default Settings;
