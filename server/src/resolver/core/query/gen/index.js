

import psQueryResolvers from './ps';

import ssQueryResolvers from './ss';

var coreGeneratedQueryResolvers = {
  
    ...psQueryResolvers,
  
    ...ssQueryResolvers,
  
};

export default coreGeneratedQueryResolvers;
