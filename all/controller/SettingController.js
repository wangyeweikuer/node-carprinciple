var dao = require('../dao/settingDao.js');
module.exports = {
	getLatest : function(queryObj, cb){
		dao.findAll(function(results){
			var setting = {};
			for(var i in results){
				var r = results[i];
				setting[r.key] = r.value;
			}
			cb(200,{'content-type':'text/json; charset=utf-8'},JSON.stringify(setting));
		});
	}
};
