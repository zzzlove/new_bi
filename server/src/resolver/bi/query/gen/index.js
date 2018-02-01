

import biQueryResolvers from './bi';

import fiQueryResolvers from './fi';

import hroutsideQueryResolvers from './hroutside';

import mdQueryResolvers from './md';

import mmQueryResolvers from './mm';

import psQueryResolvers from './ps';

import sdQueryResolvers from './sd';

import wfQueryResolvers from './wf';

var biGeneratedQueryResolvers = {
  
    ...biQueryResolvers,
  
    ...fiQueryResolvers,
  
    ...hroutsideQueryResolvers,
  
    ...mdQueryResolvers,
  
    ...mmQueryResolvers,
  
    ...psQueryResolvers,
  
    ...sdQueryResolvers,
  
    ...wfQueryResolvers,
  
};

export default biGeneratedQueryResolvers;
