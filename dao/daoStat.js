module.exports = {
	list: function(con, res, req) {
		con.query("SELECT * FROM stat", function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	getById: function(con, res, req) {
		con.query("SELECT * FROM stat WHERE idUser="+req.body.idUser, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	add: function(con, res, req) {
		var sql = "INSERT INTO stat (idUser, idGame, nbWin, nbGame, earnedToken) "
				+ "VALUES ("+req.body.idUser+", "+req.body.idGame+", "+req.body.nbWin+", "+req.body.nbGame+", "+req.body.earnedToken+")";
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	update: function(con, res, req) {
		var sql = "UPDATE stat "
				+ "SET nbWin="+req.body.nbWin+", nbGame="+req.body.nbGame+", earnedToken="+req.body.earnedToken+" "
				+ "WHERE idUser="+req.body.idUser+" AND idGame="+req.body.idGame;
		con.query(sql, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	del: function(con, res, req) {
		con.query("DELETE * FROM stat WHERE idUser="+req.body.idUser+" AND idGame="+req.body.idGame, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	}
}