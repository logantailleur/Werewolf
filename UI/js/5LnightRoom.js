import { nightStarted } from '../services/FetchAPI.js';

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

    var response = await nightStarted(lobbyCode);
	if (response.success) {
		var role = localStorage.getItem("role");
		
		if (role == "werewolf") {
			window.location.href = '6L_werewolf_night.html';
		} else if (role == "villager") {
			window.location.href = '6L_villager_night.html';
		}
	} else {
		var errorMessage = document.getElementById('voteFinishedError');
		errorMessage.innerHTML = `Sorry, voting for game <strong>${lobbyCode}</strong> has not finished. Please try again.`;
		return;
	}
}