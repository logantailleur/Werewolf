function generateRandom5DigitNumber() {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return randomNumber;
}

module.exports = { generateRandom5DigitNumber };
