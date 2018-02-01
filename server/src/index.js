import express from 'express';
import cors from 'cors';

import { configService } from './service';

import dbInit from './db_init';
import authInit from './auth_init';

import sessionInit from './session_init';
import routesInit from './routes_init';


import wsInit from './ws_init'
import dbTest from './utils/testSequize'


import { startGqlSubscriptionServer } from './gql_init';

const httpPort = configService.has('httpPort') ? configService.get('httpPort') : 8080;

const httpServer = express();

function initCors() {
  httpServer.use('*', cors({
    origin: true,
    credentials: true
  }));
}

function startHttpServer() {
  initCors();
  
  sessionInit(httpServer);
  authInit();
  routesInit(httpServer);

  wsInit();

  httpServer.listen(httpPort, () => console.log( // eslint-disable-line no-console
    `GraphQL Server is now running on http://localhost:${httpPort}/graphql`
  ));
}

dbInit().then(function() {
  startHttpServer();
  var supportSubscription = configService.get('gqlConfig.supportSubscription');
  if (supportSubscription) {
    startGqlSubscriptionServer();
  }
});
