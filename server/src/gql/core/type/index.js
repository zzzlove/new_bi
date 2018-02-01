import userTypeDefs from './user';
import channelTypeDefs from './channel';
import { coreGeneratedTypeDefs } from './gen';

var coreTypeDefs = [
  ...userTypeDefs,
  ...channelTypeDefs,
  ...coreGeneratedTypeDefs
];

export default coreTypeDefs;
