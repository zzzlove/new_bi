import { biGeneratedTypeDefs } from './gen';
import { biDefsTypeDefs } from './biDefs';

var biTypeDefs = [...biGeneratedTypeDefs, ...biDefsTypeDefs];

export default biTypeDefs;
