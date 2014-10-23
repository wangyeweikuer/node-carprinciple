//var pdao = require('./dao/principleDao.js');
//var id = 10;
//pdao.findAll(function(rows){
//	console.log(rows);
//});
//var cm = require('./conf/ConfigManager.js');
//console.log(cm.getConfigJson('db'));
//var sdao = require('./dao/settingDao.js');
//sdao.findAll(function(rows){
//	console.log(rows);
//});
//var pc = require('./controller/PrincipleController.js');
//pc.findAll({},function(code,results){
//	console.log(results);
//});
//var dc = require('./controller/DispatcherController.js');
//dc.doService('principle/findAll',{},function(code,results){
//	console.log(results);
//});
var pc = require('./controller/SettingController.js');
pc.getLatest({},function(code,results){
	console.log(results);
});
