var jsdom = require('jsdom');
var fs = require("fs");
var jquery = fs.readFileSync("./jquery.js", "utf-8");
jsdom.env({
  file : '1.html',
  src: [jquery],
  done: function (errors, window) {
    var $ = window.$;
    $("div.thumb a").each(function(k,v) {
//      console.log(v);
	console.log($(v).attr('href'));
	var i = $(v).find('img');
	console.log(i.attr('src'));
	console.log(i.attr('alt'));
    });
  }
});
