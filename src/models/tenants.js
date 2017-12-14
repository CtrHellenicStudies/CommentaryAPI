import mongoose from 'mongoose';

const TenantsModel = new mongoose.Schema({
	subdomain: {
		type: String
	},
	isAnnotation: {
		type: Boolean,
	}
});
const Tenants = mongoose.model('Tenants', TenantsModel);

export default Tenants;
