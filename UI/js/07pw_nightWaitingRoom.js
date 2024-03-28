document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeEventListeners();
}

function initializeEventListeners() {
	var continueButton = document.getElementById('continueButton');
	continueButton.addEventListener('click', handleContinueClick);
}

async function handleContinueClick() {
	var lobbyCode = localStorage.getItem('lobbyCode');
	var playerId = localStorage.getItem('playerId');

	var role = localStorage.getItem('role');

	if (role == 'werewolf') {
		window.location.href = '09p_werewolf_night_view.html';
	} else if (role == 'villager') {
		window.location.href = '09p_villager_night_view.html';
	}
}
