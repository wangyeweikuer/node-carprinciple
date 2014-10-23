var principle = require('./PrincipleController.js');
var setting = require('./SettingController.js');
var controllers = {
    principle: principle,
    setting: setting
};
module.exports = {
    /**
     * @param cmd "" 或者 "/" 或者 "/${class}/${method}"
     * @param cb callback(httpcode,result)
     */
    doService: function(cmd, queryObj, cb) {
        if (cmd == "" || cmd == "/") {
            this.displayControllers(cb);
            return;
        }
        var paths = cmd.substr(1).split('/');
        var c = controllers[paths[0]];
        if (!c || typeof c !== 'object') {
            cb(404, {
                "content-type": "text/plain; charset=utf8"
            }, 'No controller found for cmd[' + cmd + ']!');
            return;
        }
        if (paths.length == 1) {
            this.displayMethods(c, cb);
            return;
        }
        var m = c[paths[1]];
        if (!m || typeof m !== 'function') {
            cb(404, {
                "content-type": "text/plain; charset=utf8"
            }, 'No method found for cmd[' + cmd + ']!');
            return;
        }
        m(queryObj || {}, cb);
    },
    displayMethods: function(c, cb) {
        var body = '<div>(all methods:)</div>';
        for (var i in c) {
            if (typeof c[i] === 'function') {
                body += '<div>' + i + '</div>';
            }
        }
        cb(200, {
            'content-type': 'text/html; charset=utf8'
        }, body);
    },
    displayControllers: function(cb) {
        var body = '<div>(all controllers:)</div>';
        for (var i in controllers) {
            body += '<div>' + i + '</div>';
        }
        cb(200, {
            'content-type': 'text/html; charset=utf8'
        }, body);
    }
};
