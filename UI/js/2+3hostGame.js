import { createGame, joinGame, startGame } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeHostGamePage();
	initializeEventListeners();
}

async function initializeHostGamePage() {
	var createResponse = await createGame();
	var lobbyCode = createResponse.gameCode;

	localStorage.setItem('lobbyCode', lobbyCode);

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
    var userName = "Host";
    var lobbyCode = localStorage.getItem('lobbyCode');

    //Get host name, store in localStorage.
    localStorage.setItem("userName", userName);

	var joinResponse = await joinGame(lobbyCode, userName);
    if (joinResponse.success) {
        //Get returned player ID, store in localStorage.
        localStorage.setItem("playerId", joinResponse.playerId);

        //Get entered lobby, store in localStorage.
        localStorage.setItem("lobbyCode", lobbyCode);
    } else {
        var errorMessage = document.getElementById("startGameError");
        errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> doesn't exist or is full. Please try again.`;
        return;
    }
	
	//Start game if 6 people are in lobby.
	var startResponse = await startGame(lobbyCode);
	if (startResponse.success) {
		//Redirect to role_assign page.
		window.location.href = '4_role_assign.html';
	} else {
		var errorMessage = document.getElementById('startGameError');
		errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> could not be started. Please try again.`;
		return;
	}
}
