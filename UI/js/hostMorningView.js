import { handleViewRoleClick } from "./viewRoleClickHandler.js";
import { roleModalHTML } from "./roleModal.js";

const hostMorningResultsSaved = [
    "Good morning, villagers!",
    "Last night, the villagers were protected from harm.",
    "{VILLAGER_NAME} was saved by the doctor.",
    "The village owes the doctor a debt of gratitude.",
    "Let us continue our investigation to uncover the werewolves among us."
];

const hostMorningResultsKilled = [
    "Good morning, villagers!",
    "Last night, tragedy struck our village.",
    "{VILLAGER_NAME} has fallen victim to the werewolves' ruthless attack.",
    "Their sacrifice will not be forgotten as we seek justice for their untimely death.",
    "Let us remember their bravery as we work to identify the perpetrators."
];

const KILLED = 0;
const SAVED = 1;
// Start out with a welcome message from the host
var result = KILLED;

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

    // TODO: Change depending 
    result = KILLED;
}

function updateHostScript() {
    const hostScript = document.getElementById("host-script");
    // Clear previous script lines
    hostScript.innerHTML = "";
    // Append new script lines
    var script = [];

    // TODO: Get the name of the villager who was killed
    var villagerName = "[PLAYER_NAME]";

    if (result == KILLED) {
        script = hostMorningResultsKilled.map(line => line.replace("{VILLAGER_NAME}", villagerName));
    } else {
        script = hostMorningResultsSaved.map(line => line.replace("{VILLAGER_NAME}", villagerName));
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

    var morningBtn = document.getElementById("votingBtn");
    morningBtn.addEventListener("click", function() {

        window.location.href = "host_voting_view.html";

    });
}
