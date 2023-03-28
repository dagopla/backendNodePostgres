const { Client } = require('pg');

const getConnection = async () => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'dagopla',
        password: 'admin123',
        database: 'my_store'

    });
    await client.connect();
    console.log('Conectado a la DB');
    return client
}
module.exports={getConnection};