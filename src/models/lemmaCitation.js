import mongoose from 'mongoose';


const LemmaCitation = new mongoose.Schema({
	ctsNamespace: {
		type: String
	},
	textGroup: {
		type: String
	},
	work: {
		type: String
	},
	passageFrom: {
		type: [Number],
	},
	subreferenceIndexFrom: {
		type: Number,
	},
	passageTo: {
		type: [Number],
	},
	subreferenceIndexTo: {
		type: Number,
	},
});


export default LemmaCitation;
