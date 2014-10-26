var dao = require('./dao.js');
var parser = require('./sqlparser')('principle_feed');

/**
 * 获取所有的原理列表
 */
module.exports = {
    getNewFeed: function(cb) {
        var sql = parser.getSql('getNewFeed');
        dao.query(sql, function(rows) {
            cb(rows && rows.length > 0 ? rows[0] : null);
        });
    },
    findByUrl: function(url, cb) {
        var sql = parser.getSql('findByUrl', url);
        dao.query(sql, function(rows) {
            cb(rows && rows.length > 0 ? rows[0] : null);
        })
    },
    finish: function(url) {
        var sql = parser.getSql('finish', url);
        console.log(sql);
        dao.execute(sql);
    },
    create: function(url) {
        var sql = parser.getSql('create', url);
        dao.execute(sql);
    }
};
