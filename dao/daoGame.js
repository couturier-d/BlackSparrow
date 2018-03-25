module.exports = {
	list: function(con, res, req) {
		con.query("SELECT * FROM game", function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	getById: function(con, res, req) {
		con.query("SELECT * FROM game WHERE idGame="+req.body.idGame, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result[0]));
			res.end(JSON.stringify(result[0]));
		});
	},

	add: function(con, res, req) {
		var sql = "INSERT INTO game (name, nbMaxPlayer,nbMinPlayer) "
				+ "VALUES ("+req.body.name+","+req.body.maxPlayer+","+req.body.minPlayer+")";
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	update: function(con, res, req) {
		var sql = "UPDATE game "
				+ "SET name="+req.body.name+", nbMaxPlayer="+req.body.maxPlayer+", nbMinPlayer="+req.body.minPlayer+" "
				+ "WHERE idGame="+req.body.idGame;
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	del: function(con, res, req) {
		con.query("DELETE * FROM game WHERE idGame="+req.body.idGame, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	}
}