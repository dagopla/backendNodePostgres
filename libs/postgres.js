
const {Sequelize} = require('sequelize');
const {setupModels} = require('../models');
// const sequelize = new Sequelize('my_hospital', 'dagopla', 'admin123', {
//         host: 'localhost',
//         dialect: 'postgres',
//         port: 5432,
//         logging:true
// });
const USER=encodeURIComponent(process.env.DB_USER);
const PASSWORD=encodeURIComponent(process.env.DB_PASSWORD);
const HOST=process.env.DB_HOST;
const DB_DATABASE=process.env.DB_DATABASE;
const DB_DIALECT=process.env.DB_DIALECT;
const DB_PORT=process.env.DB_PORT;
const URL=`${DB_DIALECT}://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DB_DATABASE}`;
const sequelize = new Sequelize(URL,
        {
                logging:true
                });
setupModels(sequelize);

sequelize.sync({force: false})
module.exports=sequelize;