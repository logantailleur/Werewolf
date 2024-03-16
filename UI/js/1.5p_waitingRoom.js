import { viewRole } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeEventListeners();
}

function initializeEventListeners() {
	//Click listener for join game button.
	var continueButton = document.getElementById('continueButton');
	continueButton.addEventListener('click', handleContinueClick);
}

async function handleContinueClick() {
	var lobbyCode = localStorage.getItem('lobbyCode');
	var playerId = localStorage.getItem('playerId');

	var response = await viewRole(lobbyCode, playerId);
	if (response.success && response.canContinue) {
		var role = response.role;
		localStorage.setItem('role', role);
		//Redirect to role_assign page.
		window.location.href = '2p_role_assign_view.html';
	} else {
		var errorMessage = document.getElementById('gameStartedError');
		errorMessage.innerHTML = `Sorry, game <strong>${lobbyCode}</strong> has not been started. Please try again.`;
		return;
	}
}
