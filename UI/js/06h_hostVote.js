import { handleViewRoleClick } from "./viewRoleClickHandler.js";
import { roleModalHTML } from "./roleModal.js";

const hostVotingInProgress = [
    "Now is the time for the villagers to deliberate and cast their votes.",
    "Listen carefully to each villager's arguments and consider your decisions wisely.",
    "Once everyone has had their say, cast your vote for who you believe is a werewolf.",
    "Remember, the fate of the village rests in your hands."
];

const hostVotingResult = [
    "The votes have been tallied, and the decision has been made.",
    "With a majority vote, {VILLAGER_NAME} has been chosen to face judgment.",
    "Prepare yourselves as the village gathers to reveal the truth."
];

const VOTING_IN_PROGRESS = 0;
const VOTING_DONE = 1;
// Start out with a welcome message from the host
var voting_status = VOTING_DONE;

//Initialize app when DOM content is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

function initializeApp() {
    initializeEventListeners();
    updateHostScript();

    //Load role modal
    let roleModal = document.getElementById("roleModal");
    roleModal.innerHTML = roleModalHTML;

    let scriptTitle = document.getElementById("scriptTitle");
    scriptTitle.textContent = "Voting Script";

    // TODO: Change depending 
    voting_status = VOTING_IN_PROGRESS;
}

function updateHostScript() {
    const hostScript = document.getElementById("host-script");
    // Clear previous script lines
    hostScript.innerHTML = "";
    // Append new script lines
    var script = [];

    // TODO: Get the name of the villager who was killed
    var villagerName = "[PLAYER_NAME]";

    if (voting_status == VOTING_IN_PROGRESS) {
        script = hostVotingInProgress;
    } else {
        script = hostVotingResult.map(line => line.replace("{VILLAGER_NAME}", villagerName));
    }

    // Replace script based on who's turn it is
    script.forEach(line => {
        const p = document.createElement("p");
        p.textContent = line;
        hostScript.appendChild(p);
    });

}

function initializeEventListeners() {
	//Click listener for view role button.
    var viewRoleBtn = document.getElementById("viewRoleBtn");
    viewRoleBtn.addEventListener("click", handleViewRoleClick);

    var nightFallBtn = document.getElementById("nightFallBtn");
    nightFallBtn.addEventListener("click", function() {

        window.location.href = "02h_player_grid_view.html";

    });
}