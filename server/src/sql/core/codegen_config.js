import Sequelize from 'sequelize';

import { dbService } from '../../service/core';

var CodegenConfig = dbService.define('codegen_config', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, 
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  domain: {
    type: Sequelize.STRING
  },
  sub_type: {
    type: Sequelize.STRING
  },
  js_code: {
    type: Sequelize.STRING
  },
}, {
  freezeTableName: true, timestamps: true, underscored: true, schema: 'ps'
});

export { CodegenConfig };
