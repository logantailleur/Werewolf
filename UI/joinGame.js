// Function to check if the input in the text boxes are valid
function checkInput() {
    var gameCodeInput = document.getElementById("gameCodeInput");
    var nameInput = document.getElementById("nameInput")
    var joinGameButton = document.getElementById("joinGameButton");
    
    // Enable the button if the input length is 5, disable it otherwise
    if (gameCodeInput.value.length === 5 && nameInput.value.length >= 1) {
        joinGameButton.disabled = false;
        joinGameButton.classList.remove("disabled-button"); // Remove the disabled styling
    } else {
        joinGameButton.disabled = true;
        joinGameButton.classList.add("disabled-button"); // Add the disabled styling
    }
}

// Function to handle the click event for the "Join Game" button
function handleJoinGameClick() {
    var validGameCode = "11111"

    // Retrieve the name entered by the user
    var nameInput = document.getElementById("nameInput").value;

    // Store the name in local storage
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

// Function to initialize event listeners
function initializeEventListeners() {
    // Add click event listener to the "Join Game" button
    var joinGameButton = document.getElementById("joinGameButton");
    joinGameButton.addEventListener("click", handleJoinGameClick);
}

// Function to initialize the application
function initializeApp() {
    initializeEventListeners();
}

// Call the initializeApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});