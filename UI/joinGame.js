//Validate name and lobby_code.
function checkInput() {
    var nameInput = document.getElementById("nameInput").value;
    var codeInput = document.getElementById("codeInput").value;
    var joinGameButton = document.getElementById("joinGameButton");
    
    //Enable/Disable join_game button based on validity.
    if (codeInput.length === 5 && nameInput.length >= 1) {
        joinGameButton.disabled = false;
        joinGameButton.classList.remove("disabled-button"); //Remove disabled styling.
    } else {
        joinGameButton.disabled = true;
        joinGameButton.classList.add("disabled-button"); //Add disabled styling.
    }
}

async function joinGame() {
    //Get entered name, store in localStorage.
    var nameInput = document.getElementById("nameInput").value;
    localStorage.setItem("name", nameInput);

    //Get entered lobby, store in localStorage.
    var codeInput = document.getElementById("codeInput").value;
    localStorage.setItem("lobby", codeInput);

    //Checks that lobby exists in DB.
    var exists = false;
    const response0 = await fetch(`/api/getlobby/${codeInput}`);
    const body0 = await response0.json();
    if (body0.lobby != null) {
        exists = true;
    }

    if (!exists) {
        var errorMessage = document.getElementById("joinGameError");
        errorMessage.innerHTML = `Sorry, there is no game with code <strong>${codeInput}</strong>. Please try again.`;
        return;
    }

    var added = true;
    //TODO: DB call: add name to lobby.

    if (!added) {
        var errorMessage = document.getElementById("joinGameError");
        errorMessage.innerHTML = `Sorry, lobby <strong>${codeInput}</strong> is full. Please try again.`;
        return;
    }

    // Navigate to the waiting room page
    window.location.href = "waiting_room.html";
}