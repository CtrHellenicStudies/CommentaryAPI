import mongoose from 'mongoose';

const TenantsModel = new mongoose.Schema({
	_id: {
		type: String
	},
	subdomain: {
		type: String
	},
	isAnnotation: {
		type: Boolean,
	}
});
const Tenants = mongoose.model('Tenants', TenantsModel);

export default Tenants;
