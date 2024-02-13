// Function to generate a random 5-character code
function generateCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';
    for (var i = 0; i < 5; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Function to handle the initialization of the host game page
function initializeHostGamePage() {
    // Try grabbing the game code from local storage
    // TODO: Store code in database, not local storage
    var generatedCode = localStorage.getItem("gameCode");

    // If the game code is not stored, generate a new one
    if (!generatedCode) {
        generatedCode = generateCode();
        // Store the generated code in localStorage
        localStorage.setItem("gameCode", generatedCode);
    } 

    // Display the generated code
    var generatedCodeElement = document.getElementById("generatedCode");
    generatedCodeElement.textContent = "Game Code: " + generatedCode;

    // Enable the "Start Game" button if 5 or more players join the game
    var startGameButton = document.getElementById("startGameButton");
    startGameButton.disabled = true;
    startGameButton.classList.add("disabled-button");
   
}

// Function to initialize event listeners
function initializeEventListeners() {
    // Add event listener to the "Start Game" button
    var startGameButton = document.getElementById("startGameButton");
    startGameButton.addEventListener("click", handleStartGameClick);
}

// Function to handle the click event for the "Start Game" button
function handleStartGameClick() {
    // Add functionality to start the game
    // This function will be implemented later
}

// Function to initialize the application
function initializeApp() {
    initializeHostGamePage();
    initializeEventListeners();
}

// Call the initializeApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});