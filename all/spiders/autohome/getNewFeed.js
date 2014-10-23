var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});
connection.connect();
connection.query('SELECT * from principle_feed where status = 0 order by id limit 1', function(err, rows, fields) {
    if (err) throw err;
    if (rows.length > 0) {
        console.log(rows[0].url);
    } else {
        console.log('');
    }
});
connection.end();
