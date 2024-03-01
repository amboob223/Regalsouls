const { Pool } = require('pg');

const pool = new Pool({
    host:"localhost",
    port:5432,
    password:"8896",
    database:"gsite",
    user:"playabook"
});



module.exports = pool;
