//Validate name and lobby_code.
function checkInput() {
    var gameCodeInput = document.getElementById("gameCodeInput");
    var nameInput = document.getElementById("nameInput")
    var joinGameButton = document.getElementById("joinGameButton");
    
    //Enable/Disable join_game button based on validity.
    if (gameCodeInput.value.length === 5 && nameInput.value.length >= 1) {
        joinGameButton.disabled = false;
        joinGameButton.classList.remove("disabled-button"); //Remove disabled styling.
    } else {
        joinGameButton.disabled = true;
        joinGameButton.classList.add("disabled-button"); //Add disabled styling.
    }
}

function handleJoinGameClick() {
    //TODO: Replace with DB call to see if lobby_code exists.
    var validGameCode = "11111"

    //Get entered name, store in localStorage.
    var nameInput = document.getElementById("nameInput").value;
    localStorage.setItem("playerName", nameInput);

    // Check if the entered game code is correct
    if (gameCodeInput.value === validGameCode) {
        // Navigate to the waiting room page
        window.location.href = "waiting_room.html";
    } else {
        // Display an error message
        var errorMessage = document.getElementById("joinGameError");
        errorMessage.innerHTML = `Sorry, there is no game with code <strong>${gameCodeInput.value}</strong>. Please try again.`;
    }
}

function initializeEventListeners() {
    //Click EventListener for join_game button.
    var joinGameButton = document.getElementById("joinGameButton");
    joinGameButton.addEventListener("click", handleJoinGameClick);
}

// Function to initialize the application
function initializeApp() {
    initializeEventListeners();
}

//Call initializeApp() when DOM is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});