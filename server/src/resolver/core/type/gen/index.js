

import psTypeResolvers from './ps';

import ssTypeResolvers from './ss';

var coreGeneratedTypeResolvers = {
  
    ...psTypeResolvers,
  
    ...ssTypeResolvers,
  
};

export default coreGeneratedTypeResolvers;
