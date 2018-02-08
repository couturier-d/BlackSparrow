class User {
	constructor(id, nickname, password, mail, token, profil) {
		this.id = id;
		this.nickname = nickname;
		this.password = password;
		this.mail = mail;
		this.token = token;
		this.profil = profil;
	}
};

module.exports = User;