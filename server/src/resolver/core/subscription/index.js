import channelSubscriptionResolvers from './channel';
import coreGeneratedSubscriptionResolvers from './gen';

var coreSubscriptionResolvers = {
  ...channelSubscriptionResolvers,
  ...coreGeneratedSubscriptionResolvers
};

export default coreSubscriptionResolvers;
