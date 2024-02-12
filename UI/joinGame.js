function checkInput() {
    var gameCodeInput = document.getElementById("gameCodeInput");
    var nameInput = document.getElementById("nameInput")
    var button = document.getElementById("joinGameButton");
    
    // Enable the button if the input length is 5, disable it otherwise
    if (gameCodeInput.value.length === 5 && nameInput.value.length >= 1) {
        button.disabled = false;
        button.classList.remove("disabled-button"); // Remove the disabled styling
    } else {
        button.disabled = true;
        button.classList.add("disabled-button"); // Add the disabled styling
    }
}