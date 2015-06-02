var sql = require('sequelize');
var db = new sql(require('../config.json').dburl);

module.exports.db = db;

module.exports.connectionLog = db.define('connectionLog', {
		handle: sql.STRING,
		ip: sql.STRING,
		fingerprint: sql.STRING,
		connectedAt: { type: sql.DATE, defaultValue: sql.NOW }
	}, {
		timestamps: false
	}
);

module.exports.bans = db.define('bans', {
		handle: sql.STRING,
		ip: sql.STRING,
		fingerprint: sql.STRING,
		isPermanent: sql.BOOLEAN,
		expiration: sql.DATE
	}, {
		timestamps: false
	}
);

// //db.sync({force:true});
db.sync();