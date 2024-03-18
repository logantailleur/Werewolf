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

async function getAllRoles(gameCode) {
	return {
		success: true,
		players: [
			{
				name: 'Player 1',
				playerId: 1,
				role: 'werewolf',
			},
			{
				name: 'Player 2',
				playerId: 2,
				role: 'villager',
			},
			{
				name: 'Player 3',
				playerId: 3,
				role: 'villager',
			},
			{
				name: 'Player 4',
				playerId: 4,
				role: 'villager',
			},
			{
				name: 'Player 5',
				playerId: 5,
				role: 'villager',
			},
			{
				name: 'Player 6',
				playerId: 6,
				role: 'villager',
			},
		],
	};
}

async function hostSleeps(gameCode) {
	//Change gameState to 4
	return {
		success: true,
		canContinue: true,
	};
}

async function hostWakes(gameCode) {
	//Change gameState to 6
	return {
		success: true,
		canContinue: true,
	};
}

async function endVoting(gameCode) {
	//Change gameState to 9
	return {
		success: true,
		canContinue: true,
	};
}

async function playerSleeps(gameCode, playerId) {
	//Sets player sleeping to true. If all players are sleeping, Change gameState to 3
	//Return all alive players to possibly display to werewolf role
	return {
		success: true,
		players: [
			{
				name: 'Player 2',
				playerId: 2,
				role: 'villager',
			},
			{
				name: 'Player 3',
				playerId: 3,
				role: 'villager',
			},
			{
				name: 'Player 4',
				playerId: 4,
				role: 'villager',
			},
			{
				name: 'Player 5',
				playerId: 5,
				role: 'villager',
			},
			{
				name: 'Player 6',
				playerId: 6,
				role: 'villager',
			},
		],
	};
}

async function playerWakes(gameCode, playerId) {
	//Sets player sleeping to false. If all players are awake, Change gameState to 5
	return {
		success: true,
		canContinue: true,
	};
}

async function werewolfKills(gameCode, playerId, victimPlayerId) {
	//Sets player sleeping to false, sets victimPlayerId to dead. If all players are awake, Change gameState to 5
	return {
		success: true,
		canContinue: true,
	};
}

async function playerReadyToVote(gameCode, playerId) {
	//Sets player readyToVote to true. If all players are readyToVote
	return {
		success: true,
		canContinue: true,
	}
}

async function playerVote(gameCode, playerId, voteId) {
	//Sets player readyToVote to false. If all players are !readyToVote, count votes and change gameState to 10
	return {
		success: true,
	}
}

module.exports = {
	createGame,
	beginGame,
	joinRunningGame,
	viewRole,
	getAllRoles,
	hostSleeps,
	hostWakes,
	endVoting,
	playerSleeps,
	werewolfKills,
	playerReadyToVote,
	playerVote,
	playerWakes,
};
