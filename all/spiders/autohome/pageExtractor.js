var jsdom = require('jsdom');
var fs = require('fs');
var exec = require('child_process').exec;
var jquery = fs.readFileSync("../jquery.js", "utf-8");
/**
 * 替换相关的url
 */
module.exports = function(host, html, doneCallback) {
    jsdom.env(html, {
        src: [jquery]
    }, function(errors, window) {
        var $ = window.$;
        var $content = $('div.conleft');
        $content.find('font').each(function(k, v) {
            var $cnt = $(this).contents();
            $(this).replaceWith($cnt);
        });
        //将那些被a标签包裹的图片，去掉a标签
        $content.find('img').each(function(k, v) {
            var $parent = $(this).parent();
            if ($parent.get(0).tagName == 'A') {
                var cnt = $parent.contents();
                $parent.replaceWith(cnt);
            }
        });
        //url整理和替换:相对地址变绝对地址
        $content.find('a').each(function(k, v) {
            var href = $(this).attr('href');
            if (href && href.indexOf('/') == 0) {
                $(this).attr('href', host + href);
            }
        });
        //下载图片，并替换
        // $content.find('img').each(function(k, v) {
        // var src = $(this).attr('src');
        // exec('wget "' + src + '"', function(err, stdout, stderr) {
        // console.log(err);
        // });
        // });
        //输出html
        doneCallback($content.html());
    });
};
