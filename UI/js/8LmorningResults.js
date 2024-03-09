import { roleModalHTML } from "./roleModal.js";

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	initializeResultPage();
	initializeEventListeners();

	//Load role modal
	let roleModal = document.getElementById("roleModal");
	roleModal.innerHTML = roleModalHTML;
}

async function initializeResultPage() {
	var resultAnnouncement = document.getElementById('resultAnnouncement');
	var resultSummary = document.getElementById('resultSummary');
	var resultImage = document.querySelector('.result-image img');

    var victimName = "[Victim Name]";
    var victimRole = "[Victim Role]";
    var victimImage = 'ImageAssets/villagericon.png'

    resultAnnouncement.textContent = victimName + ' was killed! They were a ' + victimRole + '!';
    resultSummary.textContent = "There was nothing anyone could do to save them 😭";
    resultImage.src = victimImage;
}

function initializeEventListeners() {
	//Click listener for vote button.
    var voteBtn = document.getElementById("voteBtn");
    voteBtn.addEventListener("click", handleVoteClick);

	//Click listener for view role button.
    var viewRoleBtn = document.getElementById("viewRoleBtn");
    viewRoleBtn.addEventListener("click", handleViewRoleClick);
}

function handleVoteClick() {
    window.location.href = '9L_voting_screen.html';
}

function handleViewRoleClick() {
    //Set src attribute to desired image path inside modal.
    var modalRoleImage = document.querySelector(
		'#roleModal .role-assign-image img'
	);

    var role = localStorage.getItem("role");

    //Get reference to modal title and body elements.
    var viewRoleTitle = document.getElementById("viewRoleTitle");
    var viewRoleObjective = document.getElementById("viewRoleObjective");
    var viewRoleAbilities = document.getElementById("viewRoleAbilities");

    if (role == "werewolf") {
        modalRoleImage.src = 'ImageAssets/wolficon.png';
        viewRoleTitle.textContent = 'Werewolf';
        viewRoleObjective.textContent = "Kill off the entire village and don't get caught";
        viewRoleAbilities.textContent = "You can kill one other player each night";
    } else if (role == "villager") {
        modalRoleImage.src = 'ImageAssets/villagericon.png';
        viewRoleTitle.textContent = 'Villager';
        viewRoleObjective.textContent = "Find the identity of the werewolves";
        viewRoleAbilities.textContent = "You're a little weak, but there is strength in numbers";
    }
}
