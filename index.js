const express = require('express');
require('dotenv').config();

const cors = require('cors');

const app = express();



app.use(cors());
app.use(express.json());



app.use('/api/users', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));

app.set('port', process.env.PORT || 3000);


const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
    });