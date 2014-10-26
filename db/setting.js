var dao = require('./dao');
var parser = require('./sqlparser')('setting');
/**
 * 获取所有的原理列表
 */
module.exports = {
    findAll: function(cb) {
        var sql = parser.getSql('findAll');
        dao.query(sql, function(rows) {
            cb(rows);
        });
    }
}
