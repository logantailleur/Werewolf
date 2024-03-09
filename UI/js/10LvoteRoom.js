import { voteFinished } from '../services/FetchAPI.js';

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

    var response = await voteFinished(lobbyCode);
	if (response.success) {
		window.location.href = '11L_vote_results.html';
	} else {
		var errorMessage = document.getElementById('voteFinishedError');
		errorMessage.innerHTML = `Sorry, voting for game <strong>${lobbyCode}</strong> has not finished. Please try again.`;
		return;
	}
}