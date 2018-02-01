import { isEmptyObject } from '../utils';
import GraphQLJSON from 'graphql-type-json';
import { coreQueryResolvers, coreTypeResolvers, coreMutationResolvers, coreSubscriptionResolvers } from './core';
import { uiQueryResolvers, uiTypeResolvers, uiMutationResolvers, uiSubscriptionResolvers } from './ui';
import { biQueryResolvers, biTypeResolvers, biMutationResolvers, biSubscriptionResolvers } from './bi';

const resolvers = {
  Query: {
    ...coreQueryResolvers,
    ...uiQueryResolvers,
    ...biQueryResolvers,
  },

  ...coreTypeResolvers,
  ...uiTypeResolvers,
  ...biTypeResolvers,
  
  Mutation: {
    ...coreMutationResolvers,
    ...uiMutationResolvers,
    ...biMutationResolvers,
  },
  
  JSON: GraphQLJSON,
    
};

var subscriptionResolvers = {
  ...coreSubscriptionResolvers,
  ...uiSubscriptionResolvers,
  ...biSubscriptionResolvers,
};

if (!isEmptyObject(subscriptionResolvers)) {
  resolvers.Subscription = subscriptionResolvers;
}

export default resolvers;
