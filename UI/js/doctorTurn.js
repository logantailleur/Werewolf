import { roleCardHTML } from "./roleCard.js";
import { roleModalHTML } from "./roleModal.js";

//Initialize app when DOM content is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

function initializeApp() {
    generateRoleCards();
    initializeEventListeners();

    //Load role card.
    let myRoleCard = document.getElementById("myRoleCard");
    myRoleCard.innerHTML = roleCardHTML;
    let myName = myRoleCard.querySelector(".player-name");
    myName.textContent = "My Name"

    //Load role modal
    let roleModal = document.getElementById("roleModal");
    roleModal.innerHTML = roleModalHTML;

    // Determine if I, the player, am a doctor
    let isDoctor = true;
    
    let actionDescription = document.getElementById("actionDescription");

    if (isDoctor) {
        actionDescription.innerHTML = "<p>Choose someone to save from the werewolves 💊</p>";
    } else {
        // If I am not a werewolf, replace the other villager role cards and the bottom button with text
        document.getElementById("otherRoleCards").style.display = "none";
        document.getElementById("choosePlayerBtn").style.display = "none";
        actionDescription.innerHTML = "<p>You are asleep. The doctor is choosing someone to save from the werewolves...</p>";
    }
}

//Generate initial role cards (e.g., 10).
//TODO: Adjust the number of roles as needed.
function generateRoleCards() {
    //Clear previous role cards.
    document.getElementById("otherRoleCards").innerHTML = "";

    //Generate and append role cards.
    //TODO: Fetch number of roles and add dynamic content.
    let nOtherPlayers = 6;
    for (let i = 0; i < nOtherPlayers; i++) {
        //Create new role card element.
        let roleCardElement = document.createElement("div");
        //Adjust width and margin as needed.
        roleCardElement.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-3", "role-card");
        roleCardElement.innerHTML = roleCardHTML;

        // Generate ID for the card. 
        // TODO: replace with actual player ID
        let cardId = "roleCard" + i;
        roleCardElement.setAttribute("id", cardId);

        let playerName = roleCardElement.querySelector(".player-name")
        playerName.textContent = "Player " + (i + 2);

        //Append role card to container.
        document.getElementById("otherRoleCards").appendChild(roleCardElement);
    }
}

function initializeEventListeners() {
	//Click listener for view role button.
    var viewRoleBtn = document.getElementById("viewRoleBtn");
    viewRoleBtn.addEventListener("click", handleViewRoleClick);

    // Add click event listener to each role card
    var roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(function(roleCard) {
        roleCard.addEventListener('click', function() {
            // Deselect previously selected card
            var prevSelectedCard = document.querySelector('.role-card.selected');
            if (prevSelectedCard) {
                prevSelectedCard.classList.remove('selected');
            }
            
            // Select clicked card
            roleCard.classList.add('selected');

            console.log(roleCard.id);
        });
    });

    var choosePlayerBtn = document.getElementById("choosePlayerBtn");
    choosePlayerBtn.addEventListener("click", handleChoosePlayerBtnClick);
}

function handleChoosePlayerBtnClick() {
    var selectedCardId = document.querySelector('.role-card.selected').id;

    localStorage.setItem('selectedCardId', selectedCardId);

    console.log("Selected Card ID: ", selectedCardId);
}

function handleViewRoleClick() {
    //Set src attribute to desired image path inside modal.
    var modalRoleImage = document.querySelector("#roleModal .role-assign-image img");
    modalRoleImage.src = "ImageAssets/wolficon.png";

    //Get reference to modal title and body elements.
    var viewRoleTitle = document.getElementById("viewRoleTitle");
    var viewRoleObjective = document.getElementById("viewRoleObjective");
    var viewRoleAbilities = document.getElementById("viewRoleAbilities");

    //Change modal title.
    viewRoleTitle.textContent = "Role Title";

    //Change objective.
    viewRoleObjective.textContent = "This role's objectives.";

    //Change role abilities.
    viewRoleAbilities.textContent = "This role's abilities";
}