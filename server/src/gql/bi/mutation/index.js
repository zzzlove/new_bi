import { biGeneratedMutationDefs } from './gen';
import { biDefsMutationDefs } from './biDefs';

var biMutationDefs = [...biGeneratedMutationDefs, ...biDefsMutationDefs];

export default biMutationDefs;
