import passport from 'passport';
import { LoginHistory } from '../sql';
//import RedisStore from 'connect-redis';
import express from 'express';
import redis from 'redis';

import { configService, gqlService } from '../service';

var supportSubscription = configService.get('gqlConfig.supportSubscription');
const subscriptionAuthWithConnectionParams = configService.get('gqlConfig.subscriptionAuthWithConnectionParams');

function handleAuthRoutes(httpServer) {


    httpServer.use(passport.initialize());
    httpServer.use(passport.session());

  httpServer.post('/_api/public/login', passport.authenticate('local'), function(req, res) {

    var user = req.user;
    //Save LoginInfo
    LoginHistory.create({
        "user_id":user.id,
        "login_name":user.username,
        "login_time":new Date()
    });

    res.sendStatus(200);
  });

  httpServer.post('/_api/user/logout', function(req, res) {
    if (req.user) {
      if (supportSubscription && !subscriptionAuthWithConnectionParams) {
        gqlService.removeSubscriptionAuthToken(req.user.gqlSubscriptionAuthToken);
      }
      req.logout();
    }
    res.sendStatus(200);
  });

}

export { handleAuthRoutes };
