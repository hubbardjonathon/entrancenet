var sql = require('sequelize');
var db = {};

module.exports = function(config){
	db = new sql(config.dburl);

	module.exports.connectionLog = connectionLog = db.define('connectionLog', {
		handle: sql.STRING,
		ip: sql.STRING,
		fingerprint: sql.STRING,
		connectedAt: { type: sql.DATE, defaultValue: sql.NOW }
	}, {
		timestamps: false
	});

	db.sync({force:true});
}