import userQueryDefs from './user';
import channelQueryDefs from './channel';
import { coreGeneratedQueryDefs } from './gen';

var coreQueryDefs = [
  ...userQueryDefs,
  ...channelQueryDefs,
  ...coreGeneratedQueryDefs
];

export default coreQueryDefs;
