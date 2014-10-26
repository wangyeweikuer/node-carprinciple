var jsdom = require('jsdom');
var fs = require('fs');
var exec = require('child_process').exec;
var jquery = fs.readFileSync("../jquery.js", "utf-8");
var md5 = require('MD5');
/**
 * 替换相关的url
 * config :{
    host,
    urlReplacer,
    imgReplacer,
    referer,
 }
 */
module.exports = function(html, config, doneCallback) {
    jsdom.env(html, {
        src: [jquery]
    }, function(errors, window) {
        var $ = window.$;
        var $content = $('body');
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
                var s = (config.host + href).trim();
                s = s.replace(/\?.*/, "");
                s = config.urlReplacer(s);
                $(this).attr('href', s);
            }
        });
        //下载图片，并替换
        $content.find('img').each(function(k, v) {
            var $this = $(this);
            var src = $this.attr('src');
            var file = md5(src) + ".jpg";
            $this.attr('src', config.imgReplacer(file));
            $this.removeAttr('width').removeAttr('height'); //高和宽移除掉
            var cmd = 'curl -e "' + config.referer + '" "' + src + '" > ' + config.tmpdir + "/" + file;
            exec(cmd, function(err, stdout, stderr) {
                if (err) {
                    console.log(err);
                }
            });
        });
        $content.find('*').each(function(k, v) {
            $(this).removeAttr('style');
        });
        //替换\n字符
        var content = $content.html().replace(/\n/g, "");
        //输出html
        doneCallback(content);
    });
};
