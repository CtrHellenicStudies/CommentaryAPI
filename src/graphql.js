import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { formatError } from 'apollo-errors';
import { GraphQLSchema, execute, subscribe } from 'graphql';
import {
	makeRemoteExecutableSchema, mergeSchemas, introspectSchema
} from 'graphql-tools';
import { createApolloFetch } from 'apollo-fetch';
import { maskErrors } from 'graphql-errors';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import jwt from 'jsonwebtoken';

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
const createRemoteSchema = async (uri: string) => {
	const fetcher = createApolloFetch({uri});
	return makeRemoteExecutableSchema({
		schema: await introspectSchema(fetcher),
		fetcher
	});
}

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
 * For each graphql request add user and project to context
 */
const getGraphQLContext = req => ({
	user: req.user,
	project: req.project,
});

/**
 * Set up the graphQL HTTP endpoint
 * @param  {Object} app 	express app instance
 */
const setupGraphQL = async (app) => {
	const chsTextserverSchema = await createRemoteSchema('http://text.chs.orphe.us/graphql');

	const schema = mergeSchemas({
	  schemas: [RootSchema, chsTextserverSchema],
	});

	app.use('/graphql', jwtAuthenticate, graphqlExpress(req => ({
		schema,
		context: getGraphQLContext(req),
		formatError,
	})));

	app.use('/graphiql', graphiqlExpress({
		endpointURL: '/graphql',
	}));
}

export default setupGraphQL;
