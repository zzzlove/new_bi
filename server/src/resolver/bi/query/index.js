import biGeneratedQueryResolvers from './gen';
import { biDefsQueryResolvers } from './biDefs';
import { biDefsQueryResolversAll } from './biDefsAll';
import { ukDefsQueryResolvers } from './uk';

var biQueryResolvers = {
  ...biGeneratedQueryResolvers,
  ...biDefsQueryResolvers,
  ...ukDefsQueryResolvers,
  ...biDefsQueryResolversAll
};

export default biQueryResolvers;
