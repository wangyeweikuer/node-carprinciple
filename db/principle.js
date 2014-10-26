var dao = require('./dao.js');
var parser = require('./sqlparser')('principle');

/**
 * 获取所有的原理列表
 */
module.exports = {
    findAll: function(cb) {
        var sql = parser.getSql('findAll');
        dao.query(sql, function(rows) {
            cb(rows);
        });
    },
    findById: function(id, cb) {
        var sql = parser.getSql('findById', id);
        dao.query(sql, function(rows) {
            cb(rows.length > 0 ? rows[0] : null);
        });
    },
    findByUrl: function(url, cb) {
        var sql = parser.getSql('findByUrl', url);
        dao.query(sql, function(rows) {
            cb(rows.length > 0 ? rows[0] : null);
        });
    },
    create: function(principle) {
        var sql = parser.getSql('create', principle);
        dao.execute(sql);
    }
};
