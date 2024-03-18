import { roleCardHTML } from "./roleCard.js";
import { roleModalHTML } from "./roleModal.js";
import { generateRoleCards } from "./generateRoleCardsFunction.js";
import { handleViewRoleClick } from "./viewRoleClickHandler.js";

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

    // Determine if I, the player, am a werewolf
    let isWerewolf = true;
    
    let actionDescription = document.getElementById("actionDescription");

    if (isWerewolf) {
        actionDescription.innerHTML = "<p>Choose your prey 😈</p>";
    } else {
        // If I am not a werewolf, replace the other villager role cards and the bottom button with text
        document.getElementById("otherRoleCards").style.display = "none";
        document.getElementById("choosePlayerBtn").style.display = "none";
        actionDescription.innerHTML = "<p>You are asleep. The werewolves are choosing their prey...</p>";
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

