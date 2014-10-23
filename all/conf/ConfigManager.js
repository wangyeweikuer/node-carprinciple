var fs = require('fs');
var path = require('path');
module.exports = {
    /**
     * @name 需要取的名称。固定几个是：db
     */
    getConfigJson: function(name) {
        var jf = null;
        var files = fs.readdirSync(__dirname);
        for (var i in files) {
            var f = files[i];
            if (name + ".json" == f) {
                var s = fs.readFileSync(path.join(__dirname, f), 'utf-8');
                return JSON.parse(s);
            }
        }
        return null;
    },
};
