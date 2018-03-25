module.exports = {
	list: function(con, res, req) {
		con.query("SELECT * FROM friend WHERE idUser1="+req.body.idUser+" OR idUser2="+req.body.idUser+"", function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	add: function(con, res, req) { // TODO
		var sql = "INSERT INTO friend (idUser1, idUser2) VALUES ('"+req.body.idUser1+"','"+req.body.idUser2+"');"
		con.query(sql,	function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	del: function(con, res, req) {
		con.query("DELETE * FROM friend WHERE idUser1="+req.body.idUser1+" AND idUser2="+req.body.idUser2+"", function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	}
}