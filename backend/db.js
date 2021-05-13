const Pool = require("pg").Pool;

const pool = new Pool({
    user: "komar",
    password: "12345",
    host: "localhost",
    port: 5432,
    database: "tracker"
})

module.exports = pool;