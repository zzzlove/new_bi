import { createServer } from 'http';

import { parse } from 'graphql';

import { SubscriptionServer } from 'subscriptions-transport-ws';

import { SubscriptionManager } from 'graphql-subscriptions';

import { wildcardMatchStringArray } from './utils';

import { configService, userService, gqlService } from './service';

const wsPort = configService.has('wsPort') ? configService.get('wsPort') : 8090;

const findUser = (authToken) => {
  return Promise.resolve(null); // If you want subscriptionAuthWithConnectionParams, replace this with your own implementation.
};

var subscriptionsRequireAdminRole = [];
function loadGqlSubscriptionAuthConfig() {
  if (configService.has('auth.gql.subscription.requireAdminRole')) {
    subscriptionsRequireAdminRole = configService.get('auth.gql.subscription.requireAdminRole');
  }
}

function startGqlSubscriptionServer() {
  loadGqlSubscriptionAuthConfig();
  
  // WebSocket server for subscriptions
  const websocketServer = createServer((request, response) => {
    response.writeHead(404);
    response.end();
  });

  websocketServer.listen(wsPort, () => console.log( // eslint-disable-line no-console
    `GraphQL Subscription Server is now running on ws://localhost:${wsPort}`
  ));

  const subscriptionManager = new SubscriptionManager({
    schema: gqlService.getSchema(),
    pubsub: gqlService.getPubSub(),
  });

  const subscriptionAuthWithConnectionParams = configService.get('gqlConfig.subscriptionAuthWithConnectionParams');

  // eslint-disable-next-line
  const subscriptionsServer = new SubscriptionServer(
    {
      subscriptionManager,
      onConnect: (connectionParams, webSocket) => {
        if (!subscriptionAuthWithConnectionParams) {
          var savedInitContext = { user: null };
          webSocket.savedInitContext = savedInitContext;
          return savedInitContext;
        }
        if (!connectionParams.authToken) {
          throw new Error('Missing auth token!');
        } else {
          return findUser(connectionParams.authToken).then((user) => {
            var savedInitContext = { user };
            webSocket.savedInitContext = savedInitContext;
            return savedInitContext;
          });
        }
      },
      onSubscribe: (message, params, webSocket) => {
        if (subscriptionAuthWithConnectionParams) {
          return params;
        }
        var subscriptionName;
        var parsedQuery = parse(message.query);
        if (parsedQuery && parsedQuery.definitions && parsedQuery.definitions.length > 0) {
          var definition = parsedQuery.definitions[0];
          if (definition && definition.selectionSet && definition.selectionSet.selections && definition.selectionSet.selections.length > 0) {
            const rootField = definition.selectionSet.selections[0];
            if (rootField && rootField.name) {
              subscriptionName = rootField.name.value;
              if (subscriptionName == 'subscriptionAuth' && rootField.arguments && rootField.arguments.length == 1) {
                var arg = rootField.arguments[0];
                if (arg && arg.name && arg.name.value == 'token' && arg.value) {
                  var authToken = arg.value.value;
                  var user = gqlService.getUserBySubscriptionAuthToken(authToken);
                  webSocket.savedInitContext.user = user;
                  params.context.user = user;
                }
              }
            }
          }
        }
        if (!params.context.user || (!userService.hasRole(params.context.user, 'admin') && wildcardMatchStringArray(subscriptionsRequireAdminRole, subscriptionName))) {
          return null;
        }
        return params;
      },
    },
    {
      server: websocketServer
    }
  );
}

export { startGqlSubscriptionServer };
