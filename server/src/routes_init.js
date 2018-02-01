import express from 'express';
import bodyParser from 'body-parser';

import { urlInList } from './utils';

import { configService } from './service';

import { ensureLogined, ensureHasAdminRole } from './middleware';
import { handleAuthRoutes, handleUserRoutes, handleGqlRoutes,handleExcelRoutes } from './routes';

var urlsRequireLoginToAccess = [];
var urlsRequireAdminRoleToAccess = [];

function loadRoutesAuthConfig() {
  if (configService.has('auth.routes.requireLogin')) {
    urlsRequireLoginToAccess = configService.get('auth.routes.requireLogin');
  }
  if (configService.has('auth.routes.requireAdminRole')) {
    urlsRequireAdminRoleToAccess = configService.get('auth.routes.requireAdminRole');
  }
}

function routesInit(httpServer) {
    const redisConfig = {
        "host" : "192.168.71.96",
        "port" : "6379",
        "db" : 1,
        "ttl" : 1800,
        "logErrors" : true
    };

  loadRoutesAuthConfig();

  httpServer.use('/_api', bodyParser.json());

  handleAuthRoutes(httpServer);

  httpServer.use(ensureLogined(function(url) {
    return urlInList(url, urlsRequireLoginToAccess);
  }));
  
  httpServer.use(ensureHasAdminRole(function(url) {
    return urlInList(url, urlsRequireAdminRoleToAccess);
  }));
  
  handleUserRoutes(httpServer);
  handleGqlRoutes(httpServer);
  handleExcelRoutes(httpServer);
  
  httpServer.use(express.static('./public'));
  
  httpServer.get('*', function(req, res, next) {
    res.sendFile('index.html', {root: './public'});
  });
  
}

export default routesInit;
