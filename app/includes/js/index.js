$(document).ready(function() {
	showLoginDiv();

	$("#btnLogin").click(function() {
		var nickname = $("#nickname").val();
		var password = $("#password").val();
		if(nickname === "" || password === "") return;
		$.ajax({
			url: "/connect",
			type: 'post',
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8" 
			},
			data: JSON.stringify({
				nickname: nickname,
				password: password
			}),
			success: function(data) {
				window.location = "/";
			},
			error: function(data) {
				$("#nickname").css("border", "1px solid red");
				$("#password").css("border", "1px solid red");
				$("#failConnect").html("Pseudo ou mot de passe incorrecte !");
				$("#failConnect").css("color","red");
			}
		});
	});

	$("#btnRegister").click(function() {
		var nickname = $("#signInNickname").val();
		var mail = $("#signInEmail").val();
		var password = $("#signInPassword").val();
		if(!confirmPassword()) return;
		if(nickname === "") return;
		$.ajax({
			url: "/register",
			type: 'post',
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8" 
			},
			data: JSON.stringify({
				nickname: nickname,
				password: password,
				mail: mail
			}),
			success: function(data) {
				window.location = "/";
			},
			error: function(data) {
				$("#failSignIn").html("Erreur lors de la création du compte !");
				$("#failSignIn").css("color","red");
			}
		});
	});

	$("#btnPwdReset").click(function() {
	});
});

function showLoginDiv() {
	$("#signInDiv").hide();
	$("#resetDiv").hide();
	$("#loginDiv").show();
}

function showSignInDiv() {
	$("#signInDiv").show();
	$("#resetDiv").hide();
	$("#loginDiv").hide();
}

function showResetDiv() {
	$("#signInDiv").hide();
	$("#resetDiv").show();
	$("#loginDiv").hide();
}

function confirmPassword() {
	$("#failSignIn").empty();
	$("#signInPassword").css("border", "");
	var password = $("#signInPassword").val();
	var passwordConfirm = $("#signInPasswordConfirm").val();
	if(password !== passwordConfirm) {
		$("#failSignIn").html("Les mots de passe sont différents");
		$("#failSignIn").css("color", "red");
		$("#signInPassword").css("border", "1px solid red");
		return false;
	} else {
		$("#failSignIn").empty();
		$("#signInPassword").css("border", "1px solid green");
		return true;
	}
}