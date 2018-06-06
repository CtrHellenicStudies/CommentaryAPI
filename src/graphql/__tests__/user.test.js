import {tester} from 'graphql-tester';
import {create as createExpressWrapper} from '../../testUtils';
import {app} from '../../app';
import {closeDB} from '../../mongoose';
import Model from '../../models/user'; 

const modelName = 'User';
const modelNamePlural = 'Users';

describe(`Graphql - ${modelName} ...`, () => {

	const fieldName = 'username';

	const testServer = tester({
		server: createExpressWrapper(app),
		url: '/graphql',
		contentType: 'application/json'
	});

	beforeAll(async () => {
		await Model.remove({});
	});

	afterAll(async () => {
		await Model.remove({});
		// closeDB();
	});


	it(`should be able to read a list of ${modelNamePlural}.`, async () => {
		// SETUP
		const gqlQuery = {
			query: `query { 
				${modelNamePlural.toLowerCase()} {
					${fieldName}
				}
			  }`,
			variables: {}
		};

		// RUN
		const response = await testServer(JSON.stringify(gqlQuery));

		// CHECK
		expect(response.errors).toBeFalsy();
		expect(response.success).toBe(true);
		expect(response.data).toHaveProperty(`${modelNamePlural.toLowerCase()}`);
	});

});
