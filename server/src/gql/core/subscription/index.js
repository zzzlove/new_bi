import authSubscriptionDefs from './auth';
import channelSubscriptionDefs from './channel';
import { coreGeneratedSubscriptionDefs } from './gen';

var coreSubscriptionDefs = [
  ...authSubscriptionDefs,
  ...channelSubscriptionDefs,
  ...coreGeneratedSubscriptionDefs
];

export default coreSubscriptionDefs;
