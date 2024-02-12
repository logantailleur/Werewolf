// Function to generate a random 5-character code
function generateCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';
    for (var i = 0; i < 5; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Function to handle the click event for the "Generate Game Code" button
function handleGenerateCodeClick() {
    // Generate the code
    var generatedCode = generateCode();

    // Display the generated code beneath the button
    var generatedCodeElement = document.getElementById("generatedCode");
    generatedCodeElement.textContent = "Game Code: " + generatedCode;
}

// Function to initialize event listeners
function initializeEventListeners() {
    // Add click event listener to the "Generate Game Code" button
    var genCodeButton = document.getElementById("genCodeButton");
    genCodeButton.addEventListener("click", handleGenerateCodeClick);
}

// Function to initialize the application
function initializeApp() {
    initializeEventListeners();
}

// Call the initializeApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});