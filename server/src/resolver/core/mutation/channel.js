import { channelService } from '../../../service'
import { dbService } from '../../../service'

const coreMutationResolvers = {
  addChannel: (obj, args, context, info) => {
    return channelService.addChannel(args.name);
  },
  removeChannel: (obj, args, context, info) => {
    return channelService.removeChannel(args.name);
  },
  subscribeChannel: (obj, args, context, info) => {
    return channelService.subscribe(args.name, args.subscriberId);
  },
  unsubscribeChannel: (obj, args, context, info) => {
    return channelService.unsubscribe(args.name, args.subscriberId);
  },
};

export default coreMutationResolvers;
