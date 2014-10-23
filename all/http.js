var http = require('http');
var header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip,deflate,sdch',
    'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Cookie': '__jsluid=b4242d0e23690d6b007a4e8857eff072; BAIDU_DUP_lcr=http://www.baidu.com/s?wd=%E6%B1%BD%E8%BD%A6+%E7%99%BE%E7%A7%91&rsv_spt=1&issp=1&rsv_bp=0&ie=utf-8&tn=baiduhome_pg&rsv_sug3=8&rsv_sug4=159&rsv_sug1=8&rsv_sug2=0&inputT=4850; Hm_lvt_79d338ee31aef6a8d050378b71df1245=1410608760,1410610420,1410621704; Hm_lpvt_79d338ee31aef6a8d050378b71df1245=1411225268',
    'Host': 'www.qcbkw.com',
    'If-Modified-Since': 'Fri, 15 Aug 2014 01:38:39 GMT',
    'Referer': 'http://www.qcbkw.com/fl/bsx/',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'
};

//http.get({hostname:'car.autohome.com.cn', path:'/shuyu/detail_8_33_962.html', agent:false}, function(res) {
http.get({
    hostname: 'www.qcbkw.com',
    path: '/bsx/896.html',
    header: header,
    agent: false
}, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);
    });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
}).on('', function() {});
