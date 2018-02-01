import passport from 'passport';
import passportLocal from 'passport-local';
//import RedisStore from 'connect-redis';
import express from 'express';

let LocalStrategy = passportLocal.Strategy;

import { userService } from './service';

function authInit() {
  passport.use('local', new LocalStrategy(
    function(username, password, done) {
      userService.getByUsername(username).then(function(user) {
        if (user.password != password) {
          return done(null, null, { message: 'invalid username or password' });
        }
        return done(null, user);
      }).catch(function(err) {
        return done(null, null, { message: 'invalid username or password' });
      });
    }
  ));


   //passport.session();

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    userService.get(id).then(function(user) {
      return done(null, user);
    }).catch(function(err) {
      err = new Error("invalid user id");
      return done(err);
    });
  });
}

export default authInit;
