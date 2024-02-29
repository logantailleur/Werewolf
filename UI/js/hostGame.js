import { startGame, joinGame } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeHostGamePage();
	initializeEventListeners();
}

async function initializeHostGamePage() {
	var lobbyCode = localStorage.getItem('lobbyCode');

	//Display lobby's code.
	var generatedCodeElement = document.getElementById('lobbyCode');
	generatedCodeElement.textContent = 'Lobby Code: ' + lobbyCode;
}

function initializeEventListeners() {
	//Click listener for start game button.
	var startGameBtn = document.getElementById('startGameBtn');
	startGameBtn.addEventListener('click', handleStartGameClick);
}

async function handleStartGameClick() {
	//Get lobby's code from local storage.
	var lobbyCode = localStorage.getItem('lobbyCode');
    var joinReponse = await joinGame(lobbyCode, 'Host');
	//Start game if 6 people are in lobby.
	var response = await startGame(lobbyCode);
	if (response.success) {
		//Redirect to role_assign page.
		window.location.href = 'role_assign.html';
	} else {
		var errorMessage = document.getElementById('startGameError');
		errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> could not be started. Please try again.`;
		return;
	}
}
