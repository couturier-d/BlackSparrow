$(document).ready(function() {

	$("#btnLogin").click(function() {
		var nickname = $("#nickname").val();
		var password = $("#password").val();
		$.ajax({
			url: "/connect",
			method: 'post',
			data: {nickname: nickname, password: password},
			success: function(data) {
				$.get("/");
			},
			error: function(data) {
				console.log("AUTH FAILED");
			}
		});
	});

	$("#btnRegister").click(function() {
		
	});

	$("#btnPwdReset").click(function() {
		
	});
});