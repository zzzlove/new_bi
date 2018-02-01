import { PubSub } from 'graphql-subscriptions';

import { randomString } from '../../utils';

var gqlSchema;
var gqlSubscriptionAuthTokenMap = {};

const pubsub = new PubSub();

var gqlService = {
  setSchema(schema) {
    gqlSchema = schema;
  },
  
  getSchema() {
    return gqlSchema;
  },

  generateSubscriptionAuthToken(user) {
    var token = randomString(24);
    gqlSubscriptionAuthTokenMap[token] = user;
    return token;
  },
  
  removeSubscriptionAuthToken(token) {
    delete gqlSubscriptionAuthTokenMap[token];
  },
  
  getUserBySubscriptionAuthToken(token) {
    return gqlSubscriptionAuthTokenMap[token];
  },
  
  getPubSub() {
    return pubsub;
  },
};

export { gqlService };
