const { generateRandom5DigitNumber } = require('../utils');
const {
	addGame,
	startGame,
	joinGame,
	getRole,
	getAllPlayerRoles,
	hostSleepsDB,
	hostWakesDB,
	endVoteDB,
	playerSleepsDB,
	playerWakesDB,
	werewolfKillsDB,
	playerReadyToVoteDB,
	playerVoteDB,
	getPlayerByLastKill,
} = require('../database');

async function createGame(db) {
	const gameCode = generateRandom5DigitNumber();
	const datetimeCreated = 'Current time';
	try {
		let response = await addGame(gameCode, datetimeCreated);
		response.gameCode = gameCode;
		console.log('Create Game');
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function beginGame(gameCode) {
	try {
		let response = await startGame(gameCode);
		response.gameCode = gameCode;
		console.log('Begin Game');
		console.log(response);
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
		console.log('Join Game');
		console.log(response);
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
		response.canContinue = true;
		console.log('View Role');
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function getAllRoles(gameCode) {
	const response = { success: false, players: null };
	const players = await getAllPlayerRoles(gameCode);
	if (players) {
		response.success = true;
		response.players = players;
	}
	console.log('Get all roles');
	console.log(response);
	return response;
	// return {
	// 	success: true,
	// 	players: [
	// 		{
	// 			name: 'Player 1',
	// 			playerId: 1,
	// 			role: 'werewolf',
	// 		},
	// 		{
	// 			name: 'Player 2',
	// 			playerId: 2,
	// 			role: 'villager',
	// 		},
	// 		{
	// 			name: 'Player 3',
	// 			playerId: 3,
	// 			role: 'villager',
	// 		},
	// 		{
	// 			name: 'Player 4',
	// 			playerId: 4,
	// 			role: 'villager',
	// 		},
	// 		{
	// 			name: 'Player 5',
	// 			playerId: 5,
	// 			role: 'villager',
	// 		},
	// 		{
	// 			name: 'Player 6',
	// 			playerId: 6,
	// 			role: 'villager',
	// 		},
	// 	],
	// };
}

async function hostSleeps(gameCode) {
	//Change gameState to 4
	const response = await hostSleepsDB(gameCode);
	console.log('Host Sleeps');
	console.log(response);
	return response;
	// return {
	// 	success: true,
	// 	canContinue: true,
	// };
}

async function hostWakes(gameCode) {
	//Change gameState to 6
	const response = await hostWakesDB(gameCode);
	console.log('Host Wakes');
	console.log(response);
	return response;
	// return {
	// 	success: true,
	// 	canContinue: true,
	// };
}

async function endVoting(gameCode) {
	//Change gameState to 9
	const response = await endVoteDB(gameCode);
	console.log('End Voting');
	console.log(response);
	return response;

	// return {
	// 	success: true,
	// 	canContinue: true,
	// 	victim: {
	// 		name: 'Logan',
	// 		playerId: 1,
	// 		role: 'werewolf',
	// 		status: 'dead',
	// 	},
	// };
}

async function playerSleeps(gameCode, playerId) {
	//Sets player sleeping to true. If all players are sleeping, Change gameState to 3
	//Return all alive players to possibly display to werewolf role
	const response = await playerSleepsDB(gameCode, playerId);
	const players = await getAllPlayerRoles(gameCode);
	response.players = players;
	console.log('Player Sleeps');
	console.log(response);
	return response;
	// return {
	// 	success: true,
	// 	canContinue: true,
	// 	players: [
	// 		{
	// 			name: 'Logan',
	// 			playerId: 1,
	// 			role: 'werewolf',
	// 			status: 'alive',
	// 		},
	// 		{
	// 			name: 'Player 2',
	// 			playerId: 2,
	// 			role: 'villager',
	// 			status: 'alive',
	// 		},
	// 		{
	// 			name: 'Player 3',
	// 			playerId: 3,
	// 			role: 'villager',
	// 			status: 'alive',
	// 		},
	// 		{
	// 			name: 'Player 4',
	// 			playerId: 4,
	// 			role: 'villager',
	// 			status: 'alive',
	// 		},
	// 		{
	// 			name: 'Player 5',
	// 			playerId: 5,
	// 			role: 'villager',
	// 			status: 'alive',
	// 		},
	// 		{
	// 			name: 'Player 6',
	// 			playerId: 6,
	// 			role: 'villager',
	// 			status: 'alive',
	// 		},
	// 	],
	// };
}

async function playerWakes(gameCode, playerId) {
	//Sets player sleeping to false. If all players are awake, Change gameState to 5
	const response = await playerWakesDB(gameCode, playerId);
	console.log('Player Wakes');
	console.log(response);
	return response;
	// return {
	// 	success: true,
	// 	canContinue: true,
	// 	victim: {
	// 		name: 'Player 5',
	// 		playerId: 5,
	// 		role: 'villager',
	// 	},
	// };
}

async function werewolfKills(gameCode, playerId, victimPlayerId) {
	//Sets player sleeping to false, sets victimPlayerId to dead. If all players are awake, Change gameState to 5
	const response = await werewolfKillsDB(gameCode, playerId, victimPlayerId);
	console.log('Werewolf Kills');
	console.log(response);
	return response;
	// return {
	// 	success: true,
	// 	canContinue: true,
	// };
}

async function playerReadyToVote(gameCode, playerId) {
	//Sets player readyToVote to true. If all players are readyToVote
	const response = await playerReadyToVoteDB(gameCode, playerId);
	const players = await getAllPlayerRoles(gameCode);
	response.players = players;
	console.log('Player Ready to Vote');
	console.log(response);
	return response;

	// return {
	// 	success: true,
	// 	canContinue: true,
	// 	players: [
	// 		{
	// 			name: 'Logan',
	// 			playerId: 1,
	// 			role: 'werewolf',
	// 			status: 'alive',
	// 		},
	// 		{
	// 			name: 'Player 2',
	// 			playerId: 2,
	// 			role: 'villager',
	// 			status: 'alive',
	// 		},
	// 		{
	// 			name: 'Player 3',
	// 			playerId: 3,
	// 			role: 'villager',
	// 			status: 'alive',
	// 		},
	// 		{
	// 			name: 'Player 4',
	// 			playerId: 4,
	// 			role: 'villager',
	// 			status: 'alive',
	// 		},
	// 		{
	// 			name: 'Player 5',
	// 			playerId: 5,
	// 			role: 'villager',
	// 			status: 'alive',
	// 		},
	// 		{
	// 			name: 'Player 6',
	// 			playerId: 6,
	// 			role: 'villager',
	// 			status: 'alive',
	// 		},
	// 	],
	// };
}

async function playerVote(gameCode, playerId, voteId) {
	//Sets player readyToVote to false. If all players are !readyToVote, count votes and change gameState to 10
	const response = await playerVoteDB(gameCode, playerId, voteId);
	console.log('Player vote');
	console.log(response);
	return response;
}

async function viewVoteResult(gameCode) {
	const response = await getPlayerByLastKill(gameCode);
	console.log('View Vote Result');
	console.log(response);
	return response;
	// return {
	// 	player: {
	// 		name: 'Player 5',
	// 		playerId: 5,
	// 		role: 'villager',
	// 	},
	// 	success: true,
	// 	canContinue: true,
	// };
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
	viewVoteResult,
};
