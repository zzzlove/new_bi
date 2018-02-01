import { dbService } from './db';

import { CodegenConfig } from '../../sql';

var codegenConfigService = {
  
  get(id) {
    return CodegenConfig.findById(id);
  },
  
  findByName(name) {
    return CodegenConfig.findAll({ where: { name: name } });
  },
  
  findAll(criteria) {
    return CodegenConfig.findAll(criteria);
  },
  
  addConfig(values) {
    return CodegenConfig.create(values);
  },
  
  removeConfig(id) {
    return CodegenConfig.destroy({ where: { id: id } });
  },

  updateConfig(id, values) {
    return CodegenConfig.update(values, { where: { id: id } });
  },
  
};

export { codegenConfigService };
