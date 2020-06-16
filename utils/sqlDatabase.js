const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'den1.mysql2.gear.host',
    user: 'theloungediscord',
    password: process.env.SQL_PASSWORD,
    database: 'theloungediscord'
})

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack)
        return
    }
    console.log('connected as id ' + connection.threadId)
})

module.exports = connection