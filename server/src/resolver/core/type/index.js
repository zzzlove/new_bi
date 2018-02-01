import channelTypeResolvers from './channel';
import coreGeneratedTypeResolvers from './gen';

var coreTypeResolvers = {
  ...channelTypeResolvers,
  ...coreGeneratedTypeResolvers
};

export default coreTypeResolvers;
