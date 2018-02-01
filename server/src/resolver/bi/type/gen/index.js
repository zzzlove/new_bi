

import biTypeResolvers from './bi';

import fiTypeResolvers from './fi';

import mdTypeResolvers from './md';

import mmTypeResolvers from './mm';

import psTypeResolvers from './ps';

import sdTypeResolvers from './sd';

import wfTypeResolvers from './wf';

var biGeneratedTypeResolvers = {
  
    ...biTypeResolvers,
  
    ...fiTypeResolvers,
  
    ...mdTypeResolvers,
  
    ...mmTypeResolvers,
  
    ...psTypeResolvers,
  
    ...sdTypeResolvers,
  
    ...wfTypeResolvers,
  
};

export default biGeneratedTypeResolvers;
