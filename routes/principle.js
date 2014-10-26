var dao = require('../db/principle');
var express = require('express');
var router = express.Router();

router.get('/findAll', function(req, res) {
    dao.findAll(function(rows) {
        for (var i in rows) {
            rows[i].url = '/principle/findContentById?id=' + rows[i].id;
        }
        res.send(rows);
    });
});

function sendContent(principle, res) {
    if (principle == null || principle.content == null) {
        res.status(404).send('(no result)');
    } else {
        principle.htmltitle = principle.name;
        res.render('principle', principle);
    }
}

router.get('/findContentById', function(req, res) {
    var id = req.param('id');
    dao.findById(id, function(principle) {
        sendContent(principle, res);
    });
});

router.get('/findContentByOriginalUrl', function(req, res) {
    var url = req.param('url');
    url = decodeURIComponent(url);
    dao.findByUrl(url, function(principle) {
        sendContent(principle, res);
    });
});

module.exports = router;
