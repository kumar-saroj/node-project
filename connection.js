const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'firestore'
})

mysqlConnection.connect((err) => {
    if(err) {
        console.log('Error in connection');
    } else {
        console.log('DB connected successfully');
    }
})
module.exports = mysqlConnection