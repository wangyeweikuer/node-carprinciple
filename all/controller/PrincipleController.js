var dao = require('../dao/principleDao.js');
module.exports = {
	findAll : function(queryObj,cb){
		dao.findAll(function(results){
			cb(200,{'content-type':'text/json; charset=utf-8'},JSON.stringify(results));
		});
	},
	findContentById : function(queryObj,cb){
		var id = queryObj['id'];
		dao.findContentById(id,function(result){
			var html = '<html><head>'
			+'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>'
			+'</head><body>'+(result.content|| '')+'</body></html>';
			cb(200,{'content-type':'text/html; charset=utf-8'},html);
		});
	}
};

