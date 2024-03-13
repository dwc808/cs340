// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')
require('dotenv').config(); // Load environment variables from .env file

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_leathead',
    password        : process.env.DB_PASSWORD,
    database        : 'cs340_leathead'
})

// Export it for use in our applicaiton
module.exports.pool = pool;
