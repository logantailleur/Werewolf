import { handleViewRoleClick } from './viewRoleClickHandler.js';
import { roleModalHTML } from './roleModal.js';
import { playerSleeps } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeRoleAssignPage();
	initializeEventListeners();

	//Load role modal.
	let roleModal = document.getElementById('roleModal');
	roleModal.innerHTML = roleModalHTML;
}

async function initializeRoleAssignPage() {
	// const response = await viewRole(
	// 	localStorage.getItem('lobbyCode'),
	// 	localStorage.getItem('playerId')
	// );
	// var role = response.role;

	// localStorage.setItem('role', role);
	var role = localStorage.getItem('role');

	// Get references to document portions
	var roleAnnouncement = document.getElementById('roleAnnouncement');
	var roleSummary = document.getElementById('roleSummary');
	var roleImage = document.querySelector('.role-assign-image img');

	if (role == 'werewolf') {
		roleAnnouncement.textContent = 'You are a werewolf!';
		roleSummary.textContent = "Stay hidden, don't get caught!";
		roleImage.src = 'ImageAssets/wolficon.png';
	} else if (role == 'villager') {
		//TODO: Add "villager" roles to non-werewolves.
		roleAnnouncement.textContent = 'You are a villager!';
		roleSummary.textContent = 'Try to find the werewolves!';
		roleImage.src = 'ImageAssets/villagericon.png';
	}
}

function initializeEventListeners() {
	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);

	//Click listener for enter village button.
	var nightBtn = document.getElementById('nightBtn');
	nightBtn.addEventListener('click', handleNightClick);
}

async function handleNightClick() {
	const lobbyCode = localStorage.getItem('lobbyCode');
	const playerId = localStorage.getItem('playerId');
	var response = await playerSleeps(lobbyCode, playerId);
	console.log(response);
	if (response.success && response.canContinue) {
		var role = localStorage.getItem('role');
		localStorage.setItem('players', JSON.stringify(response.players));
		if (role == 'werewolf') {
			window.location.href = '09p_werewolf_night_view.html';
		} else if (role == 'villager') {
			window.location.href = '09p_villager_night_view.html';
		}
	}
}
