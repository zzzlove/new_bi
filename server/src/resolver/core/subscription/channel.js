const channelSubscriptionResolvers = {
  channelAdded: (channel, args, context, info) => {
    return channel;
  },
  channelRemoved: (name, args, context, info) => {
    return name;
  },
};

export default channelSubscriptionResolvers;
