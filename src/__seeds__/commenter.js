// Tenant Seeder
import faker from 'faker';

// models
import Model from '../models/commenter';

// utils
import { canSeed, generateData, insertData, notEmptyError, getRandom } from './utils';


const generateSeeds = async (count) => {
	if (await canSeed(Model)) {

		const data = await generateData(count, async () => ({
			_id: 'testCommenterID',
			tenantId: 'testTenantID',
		}));

		try {
			const seederIds = await insertData(data, Model);
			return seederIds;
		} catch (err) {
			throw err;
		}
	}
	throw notEmptyError(Model.name);
};

export default generateSeeds;
