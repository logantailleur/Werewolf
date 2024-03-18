import { viewRole } from '../services/FetchAPI.js';
import { roleModalHTML } from "./roleModal.js";
import { handleViewRoleClick } from './viewRoleClickHandler.js';

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeRoleAssignPage();
	initializeEventListeners();

	//Load role modal
	let roleModal = document.getElementById("roleModal");
	roleModal.innerHTML = roleModalHTML;
}

async function initializeRoleAssignPage() {
    // const response = await viewRole(
	// 	localStorage.getItem('lobbyCode'),
	// 	localStorage.getItem('playerId')
	// );
	// console.log(response);

	// Get references to document portions
	var resultAnnouncement = document.getElementById('resultAnnouncement');
	var resultSummary = document.getElementById('resultSummary');
	var roleImage = document.querySelector('.role-assign-image img');

	// console.log(response);
	// localStorage.setItem('role', 'werewolf');

    var victimName = "[Victim Name]";
    var victimRole = "[Victim Role]";
    var doctorSave = true;
    var victimImage = 'ImageAssets/villagericon.png'

    if (doctorSave){
        resultAnnouncement.textContent = victimName + ' was almost killed!';
        resultSummary.textContent = "The doctor was able to save them! 🙌";
        roleImage.src = victimImage;
    } else {
        resultAnnouncement.textContent = victimName + ' was killed! They were a ' + victimRole + '!';
        roleImage.src = victimImage;
        resultSummary.textContent = "There was nothing anyone could do to save them 😭";
    }
}

function initializeEventListeners() {
	//Click listener for view role button.
	var viewRoleBtn = document.getElementById('viewRoleBtn');
	viewRoleBtn.addEventListener('click', handleViewRoleClick);

	var moveOnBtn = document.getElementById("nextBtn");
    moveOnBtn.addEventListener('click', handleMoveOnBtnClick)
}

function handleMoveOnBtnClick() {
    var endGame = false;
	// change to endGame 

    if (endGame) {
        window.location.href = 'end_game_screen.html';
    } else {
        window.location.href = 'voting_screen.html';
    }

}

