var mysql = require('mysql');
var fs = require('fs');
var confingManager = require('../conf/ConfigManager.js');

module.exports = function Dao() {
    this._conf = confingManager.getConfigJson('db');
    /**
     *
     */
    this.openConnection = function() {
        var conn = mysql.createConnection(this._conf);
        conn.connect();
        return conn;
    };
    /** 
     *
     */
    this.closeConnection = function(connection) {
        if (connection) {
            connection.end();
        }
    };
    this.query = function(sql, sqlParamsArray, callback) {
        var params = sqlParamsArray instanceof Array ? sqlParamsArray : [];
        var cb = callback || sqlParamsArray;
        var conn = this.openConnection();
        try {
            conn.query(sql, params, function(err, rows, fields) {
                if (err) throw err;
                cb(rows);
            });
        } finally {
            this.closeConnection(conn);
        }
    };
    return this;
};
