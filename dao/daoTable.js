module.exports = {
	list: function(con, res, req) {
		con.query("SELECT * FROM table", function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	getById: function(con, res, req) {
		con.query("SELECT * FROM table WHERE idTable="+req.param('idTable'), function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	add: function(con, res, req) {
		var sql = "INSERT INTO table (idGame, nbPlayer) "
				+ "VALUES ("+req.param('idGame')+", "+req.param('nbPlayer')+")";
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	update: function(con, res, req) {
		var sql = "UPDATE table "
				+ "SET idGame="+req.param('idGame')+", nbPlayer="+req.param('nbPlayer')+" "
				+ "WHERE idTable="+req.param('idTable');
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	del: function(con, res, req) {
		con.query("DELETE * FROM table WHERE idTable="+req.param('idTable'), function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	}
}