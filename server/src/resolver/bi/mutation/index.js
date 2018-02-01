import biGeneratedMutationResolvers from './gen';
import { biDefsMutationResolvers } from './biDefs';


var biMutationResolvers = {
  ...biGeneratedMutationResolvers,
  ...biDefsMutationResolvers
};

export default biMutationResolvers;
