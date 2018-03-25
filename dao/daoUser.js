module.exports = {
	list: function(con, res, req) {
		con.query("SELECT * FROM user", function (err, result, fields) {
			if(err) console.log("query err!"+err);
			res.end(JSON.stringify(result));
		});
	},

	getById: function(con, res, req) {
		con.query("SELECT * FROM user WHERE idUser="+req.body.idUser, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result[0]));
		});
	},

	add: function(con, res, req) {
		var sql = "INSERT INTO user (nickname, password, mail, token, profil) " 
				+ "VALUES ('"+req.body.nickname+"','"+req.body.password+"','"+req.body.mail+"','"+req.body.token+"','"+req.body.profil+"')";
		console.log(sql);
		con.query(sql,	function (err, result, fields) {
			if(err) console.log("query err!"+err);
			res.end(JSON.stringify(result.insertId));
		});
	},

	update: function(con, res, req) {
		var sql = "UPDATE user "
				+ "SET nickname='"+req.body.nickname+"', password='"+req.body.password+"',mail='"+req.body.mail+"',token='"+req.body.token+"',profil='"+req.body.profil+"' "
				+ "WHERE idUser="+req.body.idUser;
		con.query(sql, function(err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	del: function(con, res, req) {
		con.query("DELETE * FROM user WHERE idUser="+req.body.idUser, function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	}
}