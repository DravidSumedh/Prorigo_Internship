const {Pool} = require('mysql2');

const pool =new Pool({
    user:'root',
    host:'localhost',
    database: 'tmanager',
    password: 'password',
    port: 3306
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};