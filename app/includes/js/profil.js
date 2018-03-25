$(document).ready(function() {

	$("#updateProfil").click(function() {
		var nickname = currentUser.nickname;
		var mail = $("#mailProfil").val();
		var password = $("#password").val();
		if(!confirmPassword()) return;
		if(nickname === "") return;
		$.ajax({
			url: "/updateProfil",
			type: 'post',
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8" 
			},
			data: JSON.stringify({
				password: password,
				mail: mail
			}),
			success: function(data) {
				$("#failUpdate").html("Mise à jour du compte réussi !");
				$("#failUpdate").css("color","green");
			},
			error: function(data) {
				$("#failUpdate").html("Erreur lors de la mise à jour du compte !");
				$("#failUpdate").css("color","red");
			}
		});
	});
});

function fillProfilForm(user) {
	$("#nicknameProfil").html(user.nickname);
	$("#mailProfil").val(user.mail);
}

function confirmPassword() {
	$("#failUpdate").empty();
	$("#password").css("border", "");
	var password = $("#password").val();
	var passwordConfirm = $("#passwordConfirm").val();
	if(password !== passwordConfirm) {
		$("#failUpdate").html("Les mots de passe sont différents");
		$("#failUpdate").css("color", "red");
		$("#password").css("border", "1px solid red");
		return false;
	} else {
		$("#failUpdate").empty();
		$("#password").css("border", "1px solid green");
		return true;
	}
}
