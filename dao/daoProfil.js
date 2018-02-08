module.exports = {
	list: function(con, res, req) {
		con.query("SELECT * FROM profil", function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	getById: function(con, res, req) {
		con.query("SELECT * FROM profil WHERE idProfil="+req.param('idProfil'), function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	add: function(con, res, req) {
		var sql = "INSERT INTO profil (name) VALUES ("+req.param('name')+")";
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	update: function(con, res, req) {
		var sql = "UPDATE profil "
				+ "SET name="+req.param('name')+" WHERE idProfil="+req.param('idProfil');
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	del: function(con, res, req) {
		con.query("DELETE * FROM profil WHERE idProfil="+req.param('idProfil'), function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	}
}