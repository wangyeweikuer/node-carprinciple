var htmlparser = require("htmlparser2");
var fs = require('fs');
var process = require('process');
var handler = new htmlparser.DefaultHandler(function (error, dom) {
	if (error) throw error;
	else{
		console.log(JSON.stringify(dom, null, 2));
//		console.log(dom);
	}
});
var parser = new htmlparser.Parser(handler);

process.argv.forEach(function(val,index,array){
	if(index < 2) return;
	fs.readFile(val,{encoding:'UTF-8'},function(error,data){
		if(error) throw error;
		parser.parseComplete(data);
	});
});

//function getData(host,path){
//  var http = require('http');
//  var str = '';
//
//  var options = {
//        host: host,
//        path: path,
//	agent : false
//  };
//
//  var callback = function(response) {
//
//        response.on('data', function (chunk) {
//              str += chunk;
//        });
//
//        response.on('end', function () {
//              console.log(str);
//        });
//
//        //return str;
//  }
//
//  var req = http.request(options, callback).end();
//
//  // These just return undefined and empty
//  console.log(req.data);
//  console.log(str);
//}

//getData('www.baidu.com','/index.html');
//getData('www.qcbkw.com','/fl/qcyq/3.html');

//var options = {
//  hostname: 'www.qcbkw.com',
//  port: 80,
//  path: '/fl/qcyq/',
//  method: 'GET'
//};
//
//var req = http.request(options, function(res) {
//  //console.log('STATUS: ' + res.statusCode);
//  //console.log('HEADERS: ' + JSON.stringify(res.headers));
//  res.setEncoding('utf8');
//  res.on('data', function (chunk) {
//    //console.log('BODY: ' + chunk);
//    var rawHtml = chunk;
//  });
//});
//req.end();
