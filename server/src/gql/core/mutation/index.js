import userMutationDefs from './user';
import channelMutationDefs from './channel';
import { coreGeneratedMutationDefs } from './gen';

var coreMutationDefs = [...userMutationDefs, ...channelMutationDefs, ...coreGeneratedMutationDefs];

export default coreMutationDefs;
