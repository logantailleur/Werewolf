import { handleViewRoleClick } from "./viewRoleClickHandler.js";
import { roleModalHTML } from './roleModal.js';
import { playerSleeps } from '../services/FetchAPI.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeRoleAssignPage();
	initializeEventListeners();

	//Load role modal
	let roleModal = document.getElementById('roleModal');
	roleModal.innerHTML = roleModalHTML;
}

async function initializeRoleAssignPage() {
	var resultAnnouncement = document.getElementById('resultAnnouncement');
	var resultSummary = document.getElementById('resultSummary');
	var resultImage = document.querySelector('.result-image img');

	var victim = JSON.parse(localStorage.getItem('victim'));
	var victimName = victim.name;
	var victimRole = victim.role;
	var victimImage = 'ImageAssets/villagericon.png';

	resultAnnouncement.textContent =
		victimName + ' was executed! They were a ' + victimRole + '!';
	resultSummary.textContent = 'You killed them 😭';
	resultImage.src = victimImage;
}

function initializeEventListeners() {
	//Click listener for vote button.
	var nightBtn = document.getElementById('nightBtn');
	nightBtn.addEventListener('click', handleNightClick);

	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);
}

async function handleNightClick() {
	const response = await playerSleeps(localStorage.getItem('lobbyCode'), localStorage.getItem('playerId'));
	if (response.success && response.canContinue) {
		window.location.href = '02pw_night_room_view.html';
	}
}