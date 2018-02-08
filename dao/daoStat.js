module.exports = {
	list: function(con, res, req) {
		con.query("SELECT * FROM stat", function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	getById: function(con, res, req) {
		con.query("SELECT * FROM stat WHERE idUser="+req.param('idUser'), function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	add: function(con, res, req) {
		var sql = "INSERT INTO stat (idUser, idGame, nbWin, nbGame, earnedToken) "
				+ "VALUES ("+req.param('idUser')+", "+req.param('idGame')+", "+req.param('nbWin')+", "+req.param('nbGame')+", "+req.param('earnedToken')+")";
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	update: function(con, res, req) {
		var sql = "UPDATE stat "
				+ "SET nbWin="+req.param('nbWin')+", nbGame="+req.param('nbGame')+", earnedToken="+req.param('earnedToken')+" "
				+ "WHERE idUser="+req.param('idUser')+" AND idGame="+req.param('idGame');
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	del: function(con, res, req) {
		con.query("DELETE * FROM stat WHERE idUser="+req.param('idUser')+" AND idGame="+req.param('idGame'), function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	}
}