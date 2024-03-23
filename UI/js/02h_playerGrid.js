import { handleViewRoleClick } from "./viewRoleClickHandler.js";
import { roleModalHTML } from "./roleModal.js";
import { generateRoleCards } from "./generateRoleCardsFunction.js";

//Initialize app when DOM content is loaded.
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	generateRoleCards();
    initializeEventListeners();

    //Load role modal
    let roleModal = document.getElementById("roleModal");
    roleModal.innerHTML = roleModalHTML;
}

function initializeEventListeners() {
    //Click listener for view role button.
    var viewRoleBtn = document.getElementById("viewRoleBtn");
    viewRoleBtn.addEventListener("click", handleViewRoleClick);

    var nightFallBtn = document.getElementById("nightFallBtn");
    nightFallBtn.addEventListener("click", handleContinueClick);
}

async function handleContinueClick() {
    // Redirect to the role assign page
    window.location.href = "04h_host_night_view.html";
    // TODO: Send signal to players so their screens move on to werewolf turn
}