import mongoose from 'mongoose';
import shortid from 'shortid';

const TenantsModel = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
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
