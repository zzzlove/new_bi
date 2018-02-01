import session from 'express-session';
import fileStore from 'session-file-store';

import uuid from 'node-uuid';

function sessionInit(httpServer) {
  var FileStore = fileStore(session);
  httpServer.use(session({
    genid: function(req) {
      return uuid.v4();
    },
    store: new FileStore(),
    cookie: { 
      maxAge: 60*5000
    },
    resave: true,
    rolling: true,
    saveUninitialized: false,
    secret: 'e]7GzW!9?u”/K4e'
  }));
}

export default sessionInit;

/*
  httpServer.use(session({
    genid: function(req) {
      return uuid.v4();
    },
  store: new FileStore(),
  cookie: { 
    expires: new Date(Date.now() + 60 * 10000), 
    maxAge: 60*10000
  },
  resave: false,
  saveUninitialized: false,
  secret: 'e]7GzW!9?u”/K4e'
  }));
  
import fileStore from 'session-file-store';
import redis from 'redis';
import config from 'config';

import uuid from 'node-uuid';

const client = redis.createClient(config.get('redisConfig'));

function sessionInit(httpServer) {
  console.log('init session --');

  var session = require('express-session');
  var RedisStore = require('connect-redis')(session);

  var FileStore = fileStore(session);
  httpServer.use(session({
    genid: function(req) {
      return uuid.v4();
    },
   // store: new FileStore(),
    store: new RedisStore({client: client}),
    resave: false,
    saveUninitialized: false,
    secret: 'e]7GzW!9?u”/K4e'
  }));
}

export default sessionInit;  
*/  




