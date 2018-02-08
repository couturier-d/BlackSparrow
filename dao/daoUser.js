module.exports = {
	list: function(con, res, req) {
		con.query("SELECT * FROM user", function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	getById: function(con, res, req) {
		con.query("SELECT * FROM user WHERE idUser="+req.param('idUser'), function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	add: function(con, res, req) { // TODO
		var sql = "INSERT INTO user (nickname, password, mail, token, profil) " 
				+ "VALUES ("+req.param('nickname')+","+req.param('password')+","+req.param('mail')+","+req.param('token')+","+req.param('profil')+")";
		con.query(sql,	function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	update: function(con, res, req) {
		var sql = "UPDATE user "
				+ "SET nickname="+req.param('nickname')+", password="+req.param('password')+",mail="+req.param('mail')+",token="+req.param('token')+",profil="+req.param('profil')+" "
				+ "WHERE idUser="+req.param('idUser');
		con.query(sql, function(err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	},

	del: function(con, res, req) {
		con.query("DELETE * FROM user WHERE idUser="+req.param('idUser'), function (err, result, fields) {
			if(err) console.log("query err!"+err);
			console.log("Result: " + JSON.stringify(result));
			res.end(JSON.stringify(result));
		});
	}
}