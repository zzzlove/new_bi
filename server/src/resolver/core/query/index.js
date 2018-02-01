import userQueryResolvers from './user';
import channelQueryResolvers from './channel';
import coreGeneratedQueryResolvers from './gen';

var coreQueryResolvers = {
  ...userQueryResolvers,
  ...channelQueryResolvers,
  ...coreGeneratedQueryResolvers
};

export default coreQueryResolvers;
