import { handleViewRoleClick } from "./viewRoleClickHandler.js";
import { roleModalHTML } from "./roleModal.js";

const hostWelcomeScript = [
    "Welcome to Werewolf!",
    "Today, we gather in the village to uncover the truth behind mysterious events.",
    "Each night, the werewolves prowl, seeking their next victim.",
    "During the day, the villagers must work together to identify the werewolves among them.",
    "Remember, trust no one, and may the odds be ever in your favor!"
];

const werewolfHostInstructions = [
    "Werewolves, it's time for your nightly hunt.",
    "Discuss with your fellow werewolves and choose your target wisely.",
    "Send your selection to the host via private message.",
    "Once all werewolves have made their choice, the night phase will end."
];

const seerHostInstructions = [
    "Seer, it's time to use your gift.",
    "Send a private message to the host with the player number you wish to investigate.",
    "The host will inform you of the true nature of that player's role.",
    "Use this information wisely to help the village in its quest for survival."
];

const doctorHostInstructions = [
    "Doctor, your expertise is needed tonight.",
    "Send a private message to the host with the player number you wish to protect.",
    "If the werewolves target that player, your intervention may save their life.",
    "Choose wisely, for the fate of the village hangs in the balance."
];

const WELCOME_MESSAGE = 0;
const WEREWOLF_TURN = 1;
const SEER_TURN = 2;
const DOCTOR_TURN = 3;
// Start out with a welcome message from the host
var turn = WELCOME_MESSAGE;

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
}

function updateHostScript() {
    const hostScript = document.getElementById("host-script");
    // Clear previous script lines
    hostScript.innerHTML = "";
    // Append new script lines
    var script = [];

    if (turn == WEREWOLF_TURN){
        script = werewolfHostInstructions;
    } else if (turn == SEER_TURN){
        script = seerHostInstructions;
    } else if (turn == DOCTOR_TURN){
        script = doctorHostInstructions;
    } else {
        script = hostWelcomeScript;
    }

    // Replace script based on who's turn it is
    script.forEach(line => {
        const p = document.createElement("p");
        p.textContent = line;
        hostScript.appendChild(p);
    });

    const morningBtn = document.getElementById("morningBtn");
    if (turn == WELCOME_MESSAGE) {
        morningBtn.textContent = "Next: Werewolf";
    } else if (turn == WEREWOLF_TURN) {
        morningBtn.textContent = "Next: Seer";
    } else if (turn == SEER_TURN) {
        morningBtn.textContent = "Next: Doctor";
    } else if (turn == DOCTOR_TURN) {
        morningBtn.textContent = "Next: Morning Results";
    }
}

function initializeEventListeners() {
	//Click listener for view role button.
    var viewRoleBtn = document.getElementById("viewRoleBtn");
    viewRoleBtn.addEventListener("click", handleViewRoleClick);

    var morningBtn = document.getElementById("morningBtn");
    morningBtn.addEventListener("click", function() {
        // Update turn
        if (turn == WELCOME_MESSAGE) {
            turn = WEREWOLF_TURN;
        } else if (turn == WEREWOLF_TURN) {
            turn = SEER_TURN;
        } else if (turn == SEER_TURN) {
            turn = DOCTOR_TURN;
        } else if (turn == DOCTOR_TURN) {
            // Redirect to morning view
            window.location.href = "host_morning_view.html";
            return; // Exit function early
        }

        // Update host script and button text
        updateHostScript();
    });
}
