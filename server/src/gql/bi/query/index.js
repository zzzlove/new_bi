import { biGeneratedQueryDefs } from './gen';
import { biDefsQueryDefs } from './biDefs';
import { biDefsQueryDefsAll } from './biDefsAll';
import { ukDefsQueryDefs } from './uk';

var biQueryDefs = [...biGeneratedQueryDefs, ...biDefsQueryDefs, ...ukDefsQueryDefs,...biDefsQueryDefsAll];

export default biQueryDefs;
