import { gameStarted } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

function initializeApp() {
    initializeEventListeners();
}

function initializeEventListeners() {
	//Click listener for join game button.
    var continueButton = document.getElementById("continueButton");
    continueButton.addEventListener("click", handleContinueClick);
}

async function handleContinueClick() {
    var lobbyCode = localStorage.getItem("lobbyCode");

    var response = await gameStarted(lobbyCode);
	if (response.success) {
		//Redirect to role_assign page.
		window.location.href = '4_role_assign.html';
	} else {
		var errorMessage = document.getElementById('gameStartedError');
		errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> has not been started. Please try again.`;
		return;
	}
}