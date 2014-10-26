var mysql = require('mysql');
var n = require('./normalize.js');

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
//  console.log(results.insertId);
//});
c.query('select * from principle order by id desc limit 2', function(err, results) {
    var urlReplacer = function(url) {
        return "/principle/findContentByOriginalUrl?url=" + encodeURIComponent(url);
    };
    var callback = function(res){
        console.log(res);
    };
    for(var i in results){
        var content = results[i].content;
        if(content){
            content = '<body>'+content+'</body>';
            n('http://car.autohome.com.cn', content, urlReplacer, callback);
        }
    }
});
c.end();

