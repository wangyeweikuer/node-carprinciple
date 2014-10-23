var pe = require('./pageExtractor.js');
var fs = require('fs');
var exec = require('child_process').exec;
var host = 'http://car.autohome.com.cn';
var r = fs.readFileSync('data/detail_32_35_1014.html', "UTF-8");
pe(host, r, function(rhtml) {
    console.log(rhtml);
});
//var src = 'http://qcbkw.com/uploadfile/2014/0308/thumb_170_100_20140308100836114.jpg';
//var src = 'http://img.autohome.com.cn/2012/5/28/28-18-6-28-433947405.jpg';
//exec('wget "'+src+'"',function(error,stdout,stderr){
//	console.log(error);
//});
