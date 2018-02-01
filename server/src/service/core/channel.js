import { removeArrayItem } from '../../utils';

import { gqlService } from './gql';
 
var channels = [];

var channelService = {
  get(id) {
    var result = channels.filter((channel) => {
      return channel.id == id;
    });
    if (result.length == 0) {
      return null;
    }
    return result[0];
  },

  getByName(name) {
    var result = channels.filter((channel) => {
      return channel.name == name;
    });
    if (result.length == 0) {
      return null;
    }
    return result[0];
  },
  
  findAll() {
    return channels;
  },

  addChannel(name) {
    var channel = {
      id: channels.length + 1,
      name,
      subscribers: [],
    }
    channels.push(channel);
    gqlService.getPubSub().publish('channelAdded', channel);
    return channel;
  },
  
  removeChannel(name) {
    for (var i = 0; i < channels.length; i++) {
      if (channels[i].name == name) {
        channels.splice(i, 1);
        gqlService.getPubSub().publish('channelRemoved', name);
        return true;
      }
    }
    return false;
  },

  getSubscribers(name) {
    var channel = this.getByName(name);
    if (!channel) {
      return null;
    }
    return channel.subscribers;
  },
  
  subscribe(name, subscriberId) {
    var channel = this.getByName(name);
    if (!channel) {
      return false;
    }
    channel.subscribers.push(subscriberId);
    return true;
  },
  
  unsubscribe(name, subscriberId) {
    var channel = this.getByName(name);
    if (!channel) {
      return false;
    }
    removeArrayItem(channel.subscribers, subscriberId);
    return true;
  },
  
};

export { channelService };
