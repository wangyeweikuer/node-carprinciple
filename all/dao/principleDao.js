var Dao = require ('./Dao.js');
var dao = new Dao();
var sqls = {
	"findAll" : 'select p1.id, p1.name,p2.id as parentId from principle p1 left join principle p2 on p1.parent = p2.name',
	"findContentById" : 'select content from principle where id = ?'
};
/**
 * 获取所有的原理列表
 */
module.exports = {
	findAll : function(cb){
		dao.query(sqls.findAll,function (rows){
			cb(rows);
		});
	},
	findContentById : function(id,cb){
		dao.query(sqls.findContentById,[id],function(rows){
			cb(rows.length > 0 ? rows[0] : null);
		});
	}
};

