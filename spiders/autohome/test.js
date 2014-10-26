var pe = require('./pageExtractor.js');
var fs = require('fs');
var exec = require('child_process').exec;
var host = 'http://car.autohome.com.cn';
var r = fs.readFileSync('tmp/detail_8_33_1225.html', "UTF-8");
// require('./parser') data/detail_8_9_825.html
// pe(host, r,
// function(rhtml) {
//     console.log(rhtml);
// });

//var src = 'http://qcbkw.com/uploadfile/2014/0308/thumb_170_100_20140308100836114.jpg';
//var src = 'http://img.autohome.com.cn/2012/5/28/28-18-6-28-433947405.jpg';
//exec('wget "'+src+'"',function(error,stdout,stderr){
//	console.log(error);
//});

var x = require('./normalize');
var urlReplacer = function(url) {
    return "/principle/findContentByOriginalUrl?url=" + encodeURIComponent(url);
};
var imgReplacer = function(file) {
    return "/images/principle/" + file;
};
var host = 'http://car.autohome.com.cn';
var prefix = host + '/shuyu/'
var tmpdir = "tmp";
var file = 'tmp/detail_8_33_1225.html';
var nowurl = prefix + file.substr(tmpdir.length + 1);
var referer = 'http://car.autohome.com.cn/shuyu/showimg.aspx';

var config = {
    urlReplacer: urlReplacer,
    imgReplacer: imgReplacer,
    host: host,
    referer: referer,
    tmpdir: tmpdir
}
x(r, config, function(res) {
    console.log(res);
})

