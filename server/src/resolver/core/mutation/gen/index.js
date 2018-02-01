

import psMutationResolvers from './ps';

import ssMutationResolvers from './ss';

var coreGeneratedMutationResolvers = {
  
    ...psMutationResolvers,
  
    ...ssMutationResolvers,
  
};

export default coreGeneratedMutationResolvers;
