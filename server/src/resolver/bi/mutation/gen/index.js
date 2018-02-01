

import biMutationResolvers from './bi';

import fiMutationResolvers from './fi';

import mdMutationResolvers from './md';

import mmMutationResolvers from './mm';

import psMutationResolvers from './ps';

import sdMutationResolvers from './sd';

import wfMutationResolvers from './wf';

var biGeneratedMutationResolvers = {
  
    ...biMutationResolvers,
  
    ...fiMutationResolvers,
  
    ...mdMutationResolvers,
  
    ...mmMutationResolvers,
  
    ...psMutationResolvers,
  
    ...sdMutationResolvers,
  
    ...wfMutationResolvers,
  
};

export default biGeneratedMutationResolvers;
