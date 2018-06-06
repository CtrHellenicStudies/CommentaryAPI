import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { formatError } from 'apollo-errors';
import { GraphQLSchema, execute, subscribe } from 'graphql';
import {
	makeRemoteExecutableSchema, 
	mergeSchemas, 
	introspectSchema,
	transformSchema,
	RenameTypes,
	RenameRootFields
} from 'graphql-tools';
import { createApolloFetch } from 'apollo-fetch';
import fetch from 'node-fetch';
import { maskErrors } from 'graphql-errors';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import jwt from 'jsonwebtoken';
import winston from 'winston';

// authentication
import { jwtAuthenticate } from './authentication';

// root query and mutation
import RootQuery from './graphql/queries/rootQuery';
import RootMutation from './graphql/mutations/rootMutation';

/**
 * Create a remote schema for merging with local schema definition
 * via example Schema stitching from the repo mentioned here:
 * https://dev-blog.apollodata.com/graphql-schema-stitching-8af23354ac37
 */
const createRemoteSchema = async (uri) => {
	const fetcher = async ({ query, variables, operationName, context }) => {
		const fetchResult = await fetch(uri, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query, variables, operationName })
		});
		return fetchResult.json();
	};

	return makeRemoteExecutableSchema({
		schema: await introspectSchema(fetcher),
		fetcher
	});
};

const createRemoteSchemas = async () => {
	const remoteSchemaList = [];

	// validate link to Textserver
	const textserverURI = process.env.TEXTSERVER_URL || 'http://text.chs.orphe.us/graphql';
	const chsTextserverSchema = await createRemoteSchema(textserverURI)
		.catch((e) => {
			winston.error(`Could not link remote schema ${textserverURI}`);
			winston.error(e);
			return false;
		});
	remoteSchemaList.push(chsTextserverSchema);

	// validate link to CHSWeb-API
	const chswebAPIURI = process.env.CHSWEBAPI_URL || 'http://chsweb-api.chs.orphe.us/graphql';
	const chswebAPISchema = await createRemoteSchema(chswebAPIURI)
		.catch((e) => {
			winston.error(`Could not link remote schema ${chswebAPIURI}`);
			winston.error(e);
			return false;
		});
	if (chswebAPISchema) {
		const transformedChswebAPISchema = transformSchema(chswebAPISchema, [
			new RenameTypes(typeName => `CHS_${typeName}`),
			new RenameRootFields((op, fieldName) => `CHS_${fieldName}`),
		]);
		remoteSchemaList.push(transformedChswebAPISchema);
	}

	return remoteSchemaList.filter(remoteSchema => remoteSchema);
};

/**
 * Root schema
 * @type {GraphQLSchema}
 */
const RootSchema = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});

// mask error messages for production
if (process.env.NODE_ENV === 'production') {
	maskErrors(RootSchema);
}

/**
 * For each graphql request add token from authorization headers
 */
const getGraphQLContext = (req) => {
	let token;

	if ('authorization' in req.headers) {
		token = req.headers.authorization.replace('JWT ', '');
	}

	return {
		token,
	};
};

/**
 * Set up the graphQL HTTP endpoint
 * @param  {Object} app 	express app instance
 */
const setupGraphQL = async (app) => {

	// conditional schema stitching
	let schema = RootSchema;
	if (process.env.NODE_ENV !== 'test') {
		const validRemoteSchemaList = createRemoteSchemas();
		if (validRemoteSchemaList.length > 0) {
			schema = mergeSchemas({
				schemas: [RootSchema, ...remoteSchemaList],
			});
		} 
	}

	app.use('/graphql', jwtAuthenticate, graphqlExpress(req => ({
		schema,
		context: getGraphQLContext(req),
		formatError,
	})));

	app.use('/graphiql', graphiqlExpress({
		endpointURL: '/graphql',
	}));
};

export default setupGraphQL;
