import { dayStarted } from '../services/FetchAPI.js';

document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

function initializeApp() {
    initializeEventListeners();
}

function initializeEventListeners() {
    var continueButton = document.getElementById("continueButton");
    continueButton.addEventListener("click", handleContinueClick);
}

async function handleContinueClick() {
    var lobbyCode = localStorage.getItem("lobbyCode");

    var response = await dayStarted(lobbyCode);
	if (response.success) {
		window.location.href = '8L_morning_results.html';
	} else {
		var errorMessage = document.getElementById('gameStartedError');
		errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> has not been started. Please try again.`;
		return;
	}
}