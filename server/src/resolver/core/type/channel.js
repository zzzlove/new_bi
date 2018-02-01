import { channelService, userService } from '../../../service'

const channelTypeResolvers = {
  Channel: {
    subscribers: (channel, args, context, info) => {
      var result = channelService.getSubscribers(channel.name);
      if (!result || result.length == 0) {
        return null;
      }
      return userService.findAll({ where: { id: { $in: result } } });
    },
  },
};

export default channelTypeResolvers;
