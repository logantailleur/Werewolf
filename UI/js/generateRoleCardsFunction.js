import { roleCardHTML } from "./roleCard.js";

//TODO: Adjust the number of roles as needed.
export function generateRoleCards() {
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

        // Determine if the player is dead or alive
        const isPlayerDead = isDead();

        // If dead, make the card non-selectable
        if (isPlayerDead){
            roleCardElement.classList.add("dead");
            roleCardElement.classList.add("disabled");
        }

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

function isDead() {
    // TODO: Do this based on their status in the database
    const randNum = Math.random();
    return randNum < 0.5;
}