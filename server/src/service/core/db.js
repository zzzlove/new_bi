import Sequelize from 'sequelize';

import { configService } from './config';

const dbConfig = configService.get('dbConfig');
const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  ...dbConfig.options,
});

var dbService = sequelize;

dbService.testConnection = function() {
  return dbService.authenticate();
};

export { dbService };
