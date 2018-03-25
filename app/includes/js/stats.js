$(document).ready(function() {
	fillStatsTable();
});

function fillStatsTable() {
	$.get("/stats", function(stats) {
		$.each(stats, function(index, stat) {
			let tr = document.createElement("tr");
			let gameTd = createSimpleTd(stat.game);
			let gamePlayedTd = createSimpleTd(stat.nbGame);
			let gameWinTd = createSimpleTd(stat.nbWin);
			let earnedTokenTd = createSimpleTd(stat.earnedToken);
			tr.append(gameTd, gamePlayedTd, gameWinTd, earnedTokenTd);
			$("#statsTable tbody").append(tr);
		});
	});
}

function createSimpleTd(text) {
	let td = document.createElement("td");
	let textNode = document.createTextNode(text);
	td.appendChild(textNode);
	return td;
}
