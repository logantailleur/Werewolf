import { viewRole } from '../services/FetchAPI.js';
import { roleModalHTML } from "./roleModal.js";

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
    var victimImage = 'ImageAssets/villagericon.png';

    resultAnnouncement.textContent = victimName + ' was killed! They were a ' + victimRole + '!';
    roleImage.src = victimImage;
    resultSummary.textContent = "";
}

function initializeEventListeners() {
	//Click listener for view role button.
	// var viewRoleBtn = document.getElementById('viewRoleBtn');
	// viewRoleBtn.addEventListener('click', handleViewRoleClick);

	var moveOnBtn = document.getElementById("moveOnBtn");
    moveOnBtn.addEventListener('click', handleMoveOnBtnClick);
}

function handleMoveOnBtnClick() {
    var endGame = true;
	// change to endGame 

    if (endGame) {
        window.location.href = 'end_game_screen.html';
    } else {
        window.location.href = 'village_view.html';
    }
}

function handleViewRoleClick() {
	// Set the src attribute to the desired image path inside the modal
	var modalRoleImage = document.querySelector(
		'#roleModal .role-assign-image img'
	);

    var role = localStorage.getItem("role");

	// Get a reference to the modal title and body elements
	var viewRoleTitle = document.getElementById('viewRoleTitle');
	var viewRoleObjective = document.getElementById('viewRoleObjective');
	var viewRoleAbilities = document.getElementById('viewRoleAbilities');

    if (role == "werewolf") {
        modalRoleImage.src = 'ImageAssets/wolficon.png';
        viewRoleTitle.textContent = 'Werewolf';
        viewRoleObjective.textContent = "Kill off the entire village and don't get caught";
        viewRoleAbilities.textContent = "You can kill one other player each night";
    } else {
        modalRoleImage.src = 'ImageAssets/villagericon.png';
        viewRoleTitle.textContent = 'Villager';
        viewRoleObjective.textContent = "Find the identity of the werewolves";
        viewRoleAbilities.textContent = "You're a little weak, but there is strength in numbers";
    }
}