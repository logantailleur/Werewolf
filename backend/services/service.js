const { generateRandom5DigitNumber } = require('../utils');
const {
	addGame,
	startGame,
	joinGame,
	getRole,
	closeDb,
	wipeDb,
	printDB,
} = require('../database');

async function createGame(db) {
	const gameCode = generateRandom5DigitNumber();
	const datetimeCreated = 'Current time';
	try {
		let response = await addGame(gameCode, datetimeCreated);
		response.gameCode = gameCode;
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function beginGame(gameCode) {
	try {
		let response = await startGame(gameCode);
		response.gameCode = gameCode;
		// console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function joinRunningGame(gameCode, playerName) {
	const playerId = generateRandom5DigitNumber(); //Dummy data
	try {
		let response = await joinGame(gameCode, playerId, playerName);
		response.gameCode = gameCode;
		response.playerId = playerId;
		// console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function viewRole(gameCode, playerId) {
	try {
		let response = await getRole(gameCode, playerId);
		response.gameCode = gameCode;
		response.playerId = playerId;
		// console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

module.exports = { createGame, beginGame, joinRunningGame, viewRole };
