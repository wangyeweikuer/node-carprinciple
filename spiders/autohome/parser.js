var jsdom = require('jsdom');
var fs = require("fs");
var process = require('process');
var dao = require('../../db/principle_feed');
var principleDao = require('../../db/principle');
var normalize = require('./normalize');

var jquery = fs.readFileSync("../jquery.js", "utf-8");
var arguments = process.argv.slice(2);
var file = arguments[0];
var host = 'http://car.autohome.com.cn';
var prefix = host + '/shuyu/'
var tmpdir = "tmp";
var nowurl = prefix + file.substr(tmpdir.length + 1);
var referer = 'http://car.autohome.com.cn/shuyu/showimg.aspx';

function insert_feed(url) {
    dao.findByUrl(url, function(feed) {
        if (!feed) {
            dao.create(url);
        }
    });
}

function insert_principle(principle) {
    principleDao.findByUrl(principle.originalUrl, function(old) {
        if (!old) {
            principleDao.create(principle);
        }
    });
}

function parseList() {
    jsdom.env({
        file: file,
        src: [jquery],
        done: function(errors, window) {
            if (errors) {
                console.log(errors);
                return;
            }
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
    function mergeCategory($) {
        var category = '';
        $("ul.fl.subnavul li a").each(function(k, v) {
            var name = $(v).text().trim();
            var href = $(v).attr('href');
            if (href.indexOf('list_') != -1) {
                if (category.length > 0) {
                    category += '/'
                }
                category += name;
            }
        });
        return category;
    }

    function normalizeContent($, callback) {
        var urlReplacer = function(url) {
            return "/principle/findContentByOriginalUrl?url=" + encodeURIComponent(url);
        };
        var imgReplacer = function(file) {
            return "/images/principle/" + file;
        }
        var content = $('div.conleft').html();
        var config = {
            urlReplacer: urlReplacer,
            imgReplacer: imgReplacer,
            host: host,
            referer: referer,
            tmpdir: tmpdir
        }
        normalize(content, config, callback);
    }

    jsdom.env({
        file: file,
        src: [jquery],
        done: function(errors, window) {
            if (errors) {
                console.log(errors);
                return;
            }
            var $ = window.$;
            normalizeContent($, function(content) {
                var obj = {
                    name: $('#lblName').text().trim(),
                    content: content,
                    category: mergeCategory($),
                    originalUrl: nowurl
                };
                insert_principle(obj);
            });
        }
    });
}

if (file.indexOf('detail_') >= 0) {
    parseDetail();
} else {
    parseList();
}
dao.finish(nowurl);
