var jsdom = require('jsdom');
var fs = require("fs");
var mysql = require('mysql');
var process = require('process');

var jquery = fs.readFileSync("../jquery.js", "utf-8");
var arguments = process.argv.slice(2);
var file = arguments[0];
var prefix = 'http://car.autohome.com.cn/shuyu/'
var nowurl = prefix + file;

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

function insert_feed(url) {
    var con = openConnection();
    con.query('select * from principle_feed where url = \'' + url + "\'", function(err, rows) {
        if (rows.length == 0) {
            con.query('insert into principle_feed (url) values("' + url + '")', function(err, result) {
                if (err) throw err;
                con.end();
            });
        } else {
            con.end();
        }
    });
}

function update(url) {
    var con = openConnection();
    con.query('update principle_feed set status = 1 where url = "' + url + '"', function(err, rows) {
        con.end();
    });
}

function insert_principle(principle) {
    var con = openConnection();
    con.query('select id from principle where name = "' + principle.name + '"', function(err, rows) {
        if (rows.length == 0) {
            con.query('insert into principle set ?', principle, function(err, rows) {
                con.end();
            });
        } else {
            con.end();
        }
    });
}

function parseList() {
    jsdom.env({
        file: file,
        src: [jquery],
        done: function(errors, window) {
            var $ = window.$;
            $('h3.listit a').each(function(k, v) {
                var $a = $(v);
                var url = prefix + $a.attr('href');
                insert_feed(url);
            });
        }
    });
}

function parseDetail() {
    jsdom.env({
        file: file,
        src: [jquery],
        done: function(errors, window) {
            if (errors) {
                console.log(errors);
                return;
            }
            var $ = window.$;
            var pname = null;
            $("ul.fl.subnavul li a").each(function(k, v) {
                var name = $(v).text().trim();
                var href = $(v).attr('href');
                if (href.indexOf('list_') != -1) {
                    insert_principle({
                        name: name,
                        parent: pname,
                        content: null
                    });
                    pname = name;
                }
            });
            var name = $('#lblName').text().trim();
            var content = $('div.conleft').html();
            insert_principle({
                name: name,
                content: content,
                parent: pname,
                originalUrl: nowurl
            });
        }
    });
}

if (file.indexOf('detail') == 0) {
    parseDetail();
} else {
    parseList();
}
update(nowurl);
