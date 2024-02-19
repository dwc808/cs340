/*
The following code is directly taken from the Module 1 materials. 
Date: 1/10/24
Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456203?module_item_id=23809270
*/

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_choated',
    password        : 'z(SiidR.Xnx6)XRK',
    database        : 'cs340_choated'
})

// Export it for use in our application
module.exports.pool = pool;