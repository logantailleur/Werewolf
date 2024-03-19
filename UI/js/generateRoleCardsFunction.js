import { roleCardHTML } from "./roleCard.js";

//TODO: Adjust the number of roles as needed.
export function generateRoleCards() {
    //Clear previous role cards.
    document.getElementById("otherRoleCards").innerHTML = "";

    // TODO: Get player's role. This will determine whose roles they can view, if any.
    let myRole = "host";

    //Generate and append role cards.
    //TODO: Fetch number of roles and add dynamic content.
    let nOtherPlayers = 10;
    for (let i = 0; i < nOtherPlayers; i++) {
        //Create new role card element.
        let roleCardElement = document.createElement("div");
        //Adjust width and margin as needed.
        roleCardElement.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-3", "role-card");

        roleCardElement.innerHTML = roleCardHTML;

        // Determine if the player is dead or alive
        const isPlayerDead = isDead();
        let playerStatusText = roleCardElement.querySelector(".player-status");
        // If dead, make the card non-selectable
        if (isPlayerDead){
            roleCardElement.classList.add("dead");
            roleCardElement.classList.add("disabled");
            playerStatusText.textContent = "Dead";
        } else {
            playerStatusText.textContent = "Alive";
        }

        // Generate ID for the card. 
        // TODO: replace with actual player ID from database
        let cardId = "roleCard" + i;
        roleCardElement.setAttribute("id", cardId);

        let playerName = roleCardElement.querySelector(".player-name");
        // TODO: replace with actual player name from database
        playerName.textContent = "Player " + (i + 2);

        let playerRole = roleCardElement.querySelector(".player-role");
        if (myRole == "host") {
            // TODO: Get this player's role from database
            playerRole.textContent = "[PLAYER ROLE]";
        } else {
            playerRole.textContent = "???";
        }

        //Append role card to container.
        document.getElementById("otherRoleCards").appendChild(roleCardElement);
    }
}

function isDead() {
    // TODO: Do this based on their status in the database
    const randNum = Math.random();
    return randNum < 0.2;
}