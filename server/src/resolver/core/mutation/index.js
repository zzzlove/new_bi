import userMutationResolvers from './user';
import channelMutationResolvers from './channel';
import coreGeneratedMutationResolvers from './gen';

var coreMutationResolvers = {
  ...userMutationResolvers,
  ...channelMutationResolvers,
  ...coreGeneratedMutationResolvers
};

export default coreMutationResolvers;
