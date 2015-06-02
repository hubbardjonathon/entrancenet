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

	module.exports.bans = bans = db.define('bans', {
		handle: sql.STRING,
		ip: sql.STRING,
		fingerprint: sql.STRING,
		isPermanent: sql.BOOLEAN,
		expiration: sql.DATE
	}, {
		timestamps: false
	});

	db.sync({force:true});
}