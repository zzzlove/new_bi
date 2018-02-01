import Sequelize from 'sequelize';


const dbHR = new Sequelize('hr', 'TDH_loan', 'TDH_loan@123', {
  host: '192.168.1.151',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});


const CubeDataHR = dbHR.define('tdh_cube_data', {
 id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
 cube_no: {type: Sequelize.STRING},
 t_run: {type: Sequelize.STRING},
 service_no: {type: Sequelize.STRING},
 cat_1st: {type: Sequelize.STRING},
 cat_2nd: {type: Sequelize.STRING},
 fin_code: {type: Sequelize.STRING},
 ops_code: {type: Sequelize.STRING},
 sales_code: {type: Sequelize.STRING},
 trader_no: {type: Sequelize.STRING},
 trader_name: {type: Sequelize.STRING},
 employee_no: {type: Sequelize.STRING},
 employee_name: {type: Sequelize.STRING},
 biz_code: {type: Sequelize.STRING},
 control_center: {type: Sequelize.STRING},
 control_element: {type: Sequelize.STRING},
 cat_3rd: {type: Sequelize.STRING},
 cat_4th: {type: Sequelize.STRING},
 cat_5th: {type: Sequelize.STRING},
 t_time: {type: Sequelize.DATE},
 count: {type: Sequelize.INTEGER},
 count_distinct: {type: Sequelize.INTEGER},
 amount: {type: Sequelize.FLOAT},
 pct: {type: Sequelize.FLOAT},
 data_i: {type: Sequelize.INTEGER},
 data_f: {type: Sequelize.FLOAT},
 remarks: {type: Sequelize.STRING},
}, {
 tableName: 'tdh_cube_data', timestamps: false
});

//CubeDataHR.findAll({where: {id: 16951}, limit: 10}).then(items => console.log(JSON.stringify(items)));

export {CubeDataHR};