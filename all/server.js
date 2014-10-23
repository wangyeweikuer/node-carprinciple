var http = require('http');
var url = require('url');
var os = require('os');
var dispatcher = require('./controller/DispatcherController.js');
var port = 8181;

function error404(response) {
    response.writeHead(404, {
        "content-Type": "text/plain; charset=utf-8"
    });
    response.write('Page Not Found!');
    response.end();
}

function error500(err, response) {
    res.writeHead(500);
    res.write(JSON.stringify(err));
    res.end();
    console.log(err);
}
http.createServer(function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var pathname = url_parts.pathname;
    var idx = pathname.indexOf('/api');
    if (idx != 0) {
        error404(res);
        return;
    }
    var cmd = pathname.substr(idx + "/api".length);
    console.log(cmd);
    console.log(cmd.length);
    if (cmd.length > 0 && cmd.charAt(0) != '/') {
        error404(res);
        return;
    }
    try {
        dispatcher.doService(cmd, query, function(code, headers, result) {
            res.writeHead(code, headers);
            res.write(result);
            res.end();
        });
    } catch (err) {
        error500(err, response);
    }
}).listen(port);

var ip = os.networkInterfaces().wlan0[0].address;
console.log('Server running at http://' + ip + ":" + port);
