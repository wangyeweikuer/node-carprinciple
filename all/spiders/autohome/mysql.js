var mysql = require('mysql');

function openConnection() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    connection.connect();
    return connection;
}

var c = openConnection();
//var data = {url : 'xx'};
//c.query('insert into principle_feed set ?',data,function(errs,results){
//	console.log(results.insertId);
//});
c.query('select id from principle_feed where id = 1', function(err, results) {
    console.log(results);
});
c.end();
