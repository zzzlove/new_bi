import { channelService } from '../../../service'

const channelQueryResolvers = {
  channels: (obj, args, context, info) => {
    return channelService.findAll();
  },
};

export default channelQueryResolvers;
