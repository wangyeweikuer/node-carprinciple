var dao = require('../db/setting');
var express = require('express');
var router = express.Router();

router.get('/getLatest', function(req, res) {
    dao.findAll(function(results) {
        var setting = {};
        for (var i in results) {
            var r = results[i];
            setting[r.key] = r.value;
        }
        res.send(setting);
    });
});

module.exports = router;
