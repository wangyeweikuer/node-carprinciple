var Dao = require ('./Dao.js');
var dao = new Dao();
var sqls = {
	"findAll" : 'select `key`,`value` from setting'
};
/**
 * 获取所有的原理列表
 */
module.exports = {
	findAll : function(cb){
	  	dao.query(sqls.findAll,function (rows){
			cb(rows);
		});
	}
}

