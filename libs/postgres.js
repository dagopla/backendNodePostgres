
const {Sequelize} = require('sequelize');
const {setupModels} = require('../models');
const sequelize = new Sequelize('my_hospital', 'dagopla', 'admin123', {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        logging:true
});

setupModels(sequelize);

sequelize.sync({force: false})
module.exports=sequelize;