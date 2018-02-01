import bodyParser from 'body-parser';

import { makeExecutableSchema, addSchemaLevelResolveFunction } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import { wildcardMatchStringArray } from '../utils';

import { configService, userService, gqlService } from '../service';

import { gqlSchemaDefs, subscriptionManager } from '../gql';

import resolvers from '../resolver';

const supportSubscription = configService.get('gqlConfig.supportSubscription');
const subscriptionAuthWithConnectionParams = configService.get('gqlConfig.subscriptionAuthWithConnectionParams');

var querysRequireAdminRole = [];
var mutationsRequireAdminRole = [];
var subscriptionsRequireAdminRole = [];

function loadGqlAuthConfig() {
  if (configService.has('auth.gql.query.requireAdminRole')) {
    querysRequireAdminRole = configService.get('auth.gql.query.requireAdminRole');
  }
  if (configService.has('auth.gql.mutation.requireAdminRole')) {
    mutationsRequireAdminRole = configService.get('auth.gql.mutation.requireAdminRole');
  }
  if (supportSubscription && subscriptionAuthWithConnectionParams) {
    if (configService.has('auth.gql.subscription.requireAdminRole')) {
      subscriptionsRequireAdminRole = configService.get('auth.gql.subscription.requireAdminRole');
    }
  }
}

function fieldRequireAdminRole(info) {
  if (info.operation.operation == 'query') {
    return wildcardMatchStringArray(querysRequireAdminRole, info.fieldName);
  }
  if (info.operation.operation == 'mutation') {
    return wildcardMatchStringArray(mutationsRequireAdminRole, info.fieldName);
  }
  if (supportSubscription && info.operation.operation == 'subscription') {
    if (subscriptionAuthWithConnectionParams) {
      return wildcardMatchStringArray(subscriptionsRequireAdminRole, info.fieldName);
    }
    return false;
  }
  return true;
}

function schemaLevelAuthResolver(obj, args, context, info) {
  if (fieldRequireAdminRole(info) && !(context.user && userService.hasRole(context.user, 'admin'))) {
    throw new Error('permission deny');
    return null;
  }
  return obj;
}

function handleGqlRoutes(httpServer) {
  loadGqlAuthConfig();
  
  const executableSchema = makeExecutableSchema({
    typeDefs: gqlSchemaDefs,
    resolvers: resolvers,
  });
  addSchemaLevelResolveFunction(executableSchema, schemaLevelAuthResolver);
  gqlService.setSchema(executableSchema);
  
  httpServer.use('/graphql', bodyParser.json(), graphqlExpress((req) => {
    var options = {
      schema: executableSchema,
      context: { user: req.user },
    };
    return options;
  }));

  const wsPort = configService.has('wsPort') ? configService.get('wsPort') : 8090;
  httpServer.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: supportSubscription ? `ws://localhost:${wsPort}` : null,
  }));
}

export { handleGqlRoutes };
