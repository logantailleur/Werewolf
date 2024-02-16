async function hostGame() {
	//Redirect to host_game.html page.
	window.location.href = 'host_game.html';
}

async function joinGame() {
	//Redirect to join_game.html page.
	window.location.href = 'join_game.html';
}

//Initialize application.
function initializeApp() {
}

//Call initializeApp() when DOM is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});
