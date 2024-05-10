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
	updateGameState,
	updatePlayerState,
	getPlayersDB,
	viewVoteResultPlayerDB,
	checkWinner,
} = require('../database');

async function createGame(db) {
	//Change game state to 2
	const gameCode = generateRandom5DigitNumber();
	const datetimeCreated = 'Current time';
	try {
		console.log('Create Game Request');
		console.log(gameCode, datetimeCreated);
		let response = await addGame(gameCode, datetimeCreated);
		response.gameCode = gameCode;
		// response.canContinue = true;//
		console.log('Create Game');
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function beginGame(gameCode) {
	try {
		console.log('Create Game Request');
		console.log(gameCode);
		let response = await startGame(gameCode);
		response.gameCode = gameCode;
		// response.canContinue = true;//
		console.log('Begin Game');
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function joinRunningGame(gameCode, playerName) {
	//Check game 2 and change player 4
	const playerId = generateRandom5DigitNumber();
	try {
		console.log('Join Game Request');
		console.log(gameCode, playerName);
		let response = await joinGame(gameCode, playerId, playerName);
		response.gameCode = gameCode;
		response.playerId = playerId;
		// response.canContinue = true;//
		console.log('Join Game');
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function viewRole(gameCode, playerId) {
	//Check game 5
	try {
		console.log('View Role Request');
		console.log(gameCode, playerId);
		let response = await getRole(gameCode, playerId);
		response.gameCode = gameCode;
		response.playerId = playerId;
		// response.canContinue = true;//
		console.log('View Role');
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function getAllRoles(gameCode) {
	console.log('Get All Roles Request');
	console.log(gameCode);
	//Check players 4 or 16 and change game 5
	const response = { success: false, players: null };
	const players = await getAllPlayerRoles(gameCode);
	if (players) {
		response.success = true;
		response.players = players;
	}
	// response.canContinue = true;//
	console.log('Get all roles');
	console.log(response);
	updateGameState(gameCode, 5);
	return response;
}

async function hostSleeps(gameCode) {
	console.log('Host Sleeps Request');
	console.log(gameCode);
	//Check players 7 and change game 8
	const response = await hostSleepsDB(gameCode);
	// response.canContinue = true;//
	console.log('Host Sleeps');
	console.log(response);
	return response;
}

async function hostWakes(gameCode) {
	console.log('Host Wakes Request');
	console.log(gameCode);
	//Check players 10 and change game 11
	const response = await hostWakesDB(gameCode);
	// response.canContinue = true;//
	console.log('Host Wakes');
	console.log(response);
	return response;
}

async function endVoting(gameCode) {
	console.log('End Voting Request');
	console.log(gameCode);
	//Check players 13 and change game 15
	const response = await endVoteDB(gameCode);
	// response.canContinue = true;//
	console.log('End Voting');
	console.log(response);
	return response;
}

async function playerSleeps(gameCode, playerId) {
	console.log('Player Sleeps Request');
	console.log(gameCode, playerId);
	//Check game 5 and change player 7
	const response = await playerSleepsDB(gameCode, playerId);
	const players = await getPlayersDB(gameCode);
	response.players = players;
	// response.canContinue = true;//
	console.log('Player Sleeps');
	console.log(response);
	return response;
}

async function playerWakes(gameCode, playerId) {
	console.log('Player Wakes Request');
	console.log(gameCode, playerId);
	//Check game 8 and change player 10
	const response = await playerWakesDB(gameCode, playerId);
	// response.canContinue = true;//
	console.log('Player Wakes');
	console.log(response);
	return response;
}

async function werewolfKills(gameCode, playerId, victimPlayerId) {
	console.log('Werewolf Kills Request');
	console.log(gameCode, playerId, victimPlayerId);
	//Check game 8
	const response = await werewolfKillsDB(gameCode, playerId, victimPlayerId);
	// response.canContinue = true;//
	console.log('Werewolf Kills');
	console.log(response);
	return response;
}

async function playerReadyToVote(gameCode, playerId) {
	console.log('Ready to Vote Request');
	console.log(gameCode, playerId);
	//Check game 11 and change player 12
	const response = await playerReadyToVoteDB(gameCode, playerId);
	const players = await getPlayersDB(gameCode);
	response.players = players;
	// response.canContinue = true;//
	console.log('Player Ready to Vote');
	console.log(response);
	return response;
}

async function playerVote(gameCode, playerId, voteId) {
	console.log('Player Vote Request');
	console.log(gameCode, playerId, voteId);
	//Check game 11 and change player 13
	const response = await playerVoteDB(gameCode, playerId, voteId);
	// response.canContinue = true;//
	console.log('Player vote');
	console.log(response);
	return response;
}

async function viewVoteResult(gameCode) {
	console.log('View Vote Request');
	console.log(gameCode);
	//Check game 15 and change player 16
	const response = await getPlayerByLastKill(gameCode);
	// response.canContinue = true;//
	console.log('View Vote Result');
	console.log(response);
	return response;
}

async function viewVoteResultPlayer(gameCode, playerId) {
	console.log('View Vote Player Request');
	console.log(gameCode, playerId);
	const response = await viewVoteResultPlayerDB(gameCode, playerId);
	console.log('View vote result player');
	console.log(response);
	return response;
}

async function checkGameWinner(gameCode) {
	console.log('Check Game Winner');
	console.log(gameCode);
	const response = await checkWinner(gameCode);
	console.log('Check Winner result');
	console.log(response);
	return response;
}

module.exports = {
	viewVoteResultPlayer,
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
	checkGameWinner,
};
