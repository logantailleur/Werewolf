const { generateRandom5DigitNumber } = require('../utils');

function createGame() {
	return generateRandom5DigitNumber(); //Dummy data
}

function startGame(gameCode) {
	return { success: true, gameCode: gameCode }; //Dummy data
}

function joinGame(gameCode) {
	const playerId = generateRandom5DigitNumber(); //Dummy data
	return { success: true, gameCode: gameCode, playerId: playerId };
}

function viewRole(gameCode, playerId) {
	return {
		success: true,
		gameCode: gameCode,
		playerId: playerId,
		role: 'werewolf',
	};
}

module.exports = { createGame, startGame, joinGame, viewRole };
