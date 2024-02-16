//Generate random 5-character code.
function generateCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';
    for (var i = 0; i < 5; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

function initializeHostGamePage() {
    //Generate lobby_code.
    var generatedCode = generateCode();
    
    //Store lobby_code in DB.
    //TODO: Add DB call.
    localStorage.setItem("gameCode", generatedCode);

    //Display lobby_code.
    var generatedCodeElement = document.getElementById("generatedCode");
    generatedCodeElement.textContent = "Game Code: " + generatedCode;

}

async function startGame() {
    //TODO: Call DB to verify 5 people are in lobby, start game if yes.
}

//Initialize application.
function initializeApp() {
    initializeHostGamePage();
}

//Call initializeApp() when DOM is loaded.
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});