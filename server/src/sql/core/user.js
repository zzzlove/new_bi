import Sequelize from 'sequelize';

import { dbService } from '../../service/core';


var User = dbService.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, 
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  name: {type: Sequelize.STRING},
  roles: {type: Sequelize.ARRAY(Sequelize.STRING)},
  profile_id: {type: Sequelize.INTEGER},
  fin_id: {type: Sequelize.INTEGER},
  ops_id: {type: Sequelize.INTEGER},
  sales_id: {type: Sequelize.INTEGER},
  started_at: {type: Sequelize.DATE},
  finished_at: {type: Sequelize.DATE},
  disabled: {type: Sequelize.BOOLEAN},
  fin_code: {type: Sequelize.STRING,},
  ops_code: {type: Sequelize.STRING,},
  sales_code: {type: Sequelize.STRING,},
  fin_code_all: {type: Sequelize.ARRAY(Sequelize.STRING)},
  ops_code_all: {type: Sequelize.ARRAY(Sequelize.STRING)},
  sales_code_all: {type: Sequelize.ARRAY(Sequelize.STRING)},
  product_no_all: {type: Sequelize.ARRAY(Sequelize.STRING)},
  service_no_all: {type: Sequelize.ARRAY(Sequelize.STRING)},
  company_code: {type: Sequelize.STRING},
  control_center_all: {type: Sequelize.ARRAY(Sequelize.STRING)},
  control_center_ids: {type: Sequelize.ARRAY(Sequelize.INTEGER)},  
  control_ids: {type: Sequelize.ARRAY(Sequelize.INTEGER)},  
  concerning_ids: {type: Sequelize.ARRAY(Sequelize.INTEGER)},  
}, {
 tableName: 'user', timestamps: true, underscored: true, freezeTableName: true, schema: 'ss', paranoid: true
});

export { User };
