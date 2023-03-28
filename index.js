const express = require('express');
require('dotenv').config();

const cors = require('cors');
const {getConnection}= require('./libs/postgres')
const app = express();



app.use(cors())
getConnection()

app.set('port', process.env.PORT || 3000);


const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
    });