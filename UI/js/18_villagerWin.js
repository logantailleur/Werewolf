import { handleViewRoleClick } from "./viewRoleClickHandler.js";
import { roleModalHTML } from '../roleModal.js';

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
	// Get references to document portions
	var resultAnnouncement = document.getElementById('resultAnnouncement');
	var resultSummary = document.getElementById('resultSummary');
	var roleImage = document.querySelector('.role-assign-image img');

	var villagerImage = 'ImageAssets/villagerwinicon.png';

	resultAnnouncement.textContent = 'The villagers won!';
	roleImage.src = villagerImage;
	resultSummary.textContent = 'The villagers successfully killed all the werewolves!';
}

function initializeEventListeners() {
	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);
}