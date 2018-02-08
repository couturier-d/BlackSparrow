module.exports = {
	list: function(con, res, req) {
		con.query("SELECT * FROM game", function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	getById: function(con, res, req) {
		con.query("SELECT * FROM user WHERE idGame="+req.param('idGame'), function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	add: function(con, res, req) {
		var sql = "INSERT INTO game (name, nbMaxPlayer,nbMinPlayer) "
				+ "VALUES ("+req.param('name')+","+req.param('maxPlayer')+","+req.param('minPlayer')+")";
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	update: function(con, res, req) {
		var sql = "UPDATE game "
				+ "SET name="+req.param('name')+", nbMaxPlayer="+req.param('maxPlayer')+", nbMinPlayer="+req.param('minPlayer')+" "
				+ "WHERE idGame="+req.param('idGame');
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	del: function(con, res, req) {
		con.query("DELETE * FROM game WHERE idGame="+req.param('idGame'), function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	}
}