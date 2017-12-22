import mongoose from 'mongoose';

const SubworksModel = new mongoose.Schema({
	title: {
		type: String,
	},
	slug: {
		type: String,
		optional: true,
	},

	n: {
		type: Number,
	},

	tlgNumber: {
		type: String,
		optional: true,
	},

	nComments: {
		type: Number,
		optional: true,
	},

	commentHeatmap: {
		type: [new mongoose.Schema({
			nComments: {
				type: Number
			},
			n: {
				type: Number
			}
		})],
		optional: true,
	},
});
const Subworks = mongoose.model('Subworks', SubworksModel);

export default Subworks;
export { SubworksModel };
