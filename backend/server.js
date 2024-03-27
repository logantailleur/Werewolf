const express = require('express');
const cors = require('cors');
const server = express();
const {
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
	playerVote,
	playerReadyToVote,
	playerWakes,
	viewVoteResult,
} = require('./services/service');

server.use(cors());

const validateStartGameRequest = (gameCode) => {
	if (!gameCode) {
		return false;
	}
	return true;
};

const validateJoinGameRequest = (gameCode) => {
	if (!gameCode) {
		return false;
	}
	return true;
};

const validatePlayerRoleRequest = (gameCode, playerId) => {
	if (!gameCode || !playerId) {
		return false;
	}
	return true;
};

const port = 4000;
server.listen(port, () => console.log(`Server running on port ${port}`));

server.get('/api/test', (req, res) => {
	res.send(JSON.stringify('hello world'));
});

server.post('/api/game/create', async (req, res) => {
	const gameCode = await createGame();
	res.json(gameCode);
});

server.post('/api/game/start/:gameCode', async (req, res) => {
	const { gameCode } = req.params;
	if (!validateStartGameRequest(gameCode)) {
		return res.status(400).send('Missing gameCode for starting a game\n');
	}
	const response = await beginGame(gameCode);
	res.json(response);
});

server.post('/api/game/join/:gameCode/:playerName', async (req, res) => {
	const { gameCode, playerName } = req.params;
	if (!validateJoinGameRequest(gameCode)) {
		return res.status(400).send('Missing gameCode for joining a game\n');
	}
	const response = await joinRunningGame(gameCode, playerName);
	res.json(response);
});

server.get('/api/game/player/role/:gameCode/:playerId', async (req, res) => {
	const { gameCode, playerId } = req.params;
	if (!validatePlayerRoleRequest(gameCode, playerId)) {
		return res
			.status(400)
			.send('Missing gameCode and/or playerId for viewing a role\n');
	}
	const response = await viewRole(gameCode, playerId);
	res.json(response);
});

server.get('/api/game/host/players/:gameCode', async (req, res) => {
	const { gameCode } = req.params;
	if (!gameCode) {
		return res.status(400).send('Missing gameCode for viewing all roles\n');
	}
	const response = await getAllRoles(gameCode);
	if (!response.success) {
		return res.status(400).send('No gameCode found in database\n');
	}
	res.json(response);
});

server.post('/api/game/host/sleep/:gameCode', async (req, res) => {
	const { gameCode } = req.params;
	if (!gameCode) {
		return res.status(400).send('Missing gameCode for proceeding to night\n');
	}
	const response = await hostSleeps(gameCode);
	if (!response.success) {
		return res.status(400).send('No gameCode found in database\n');
	}
	// if (!response.canContinue) {
	// 	return res
	// 		.status(409)
	// 		.send('Cannot continue yet, all players must go to sleep first');
	// }
	res.json(response);
});

server.post('/api/game/host/wake/:gameCode', async (req, res) => {
	const { gameCode } = req.params;
	if (!gameCode) {
		return res.status(400).send('Missing gameCode for proceeding to day');
	}
	const response = await hostWakes(gameCode);
	if (!response.success) {
		return res.status(400).send('No gameCode found in database\n');
	}
	// if (!response.canContinue) {
	// 	return res
	// 		.status(409)
	// 		.send('Cannot continue yet, all players must wake first');
	// }
	res.json(response);
});

server.post('/api/game/host/end-vote/:gameCode', async (req, res) => {
	const { gameCode } = req.params;
	if (!gameCode) {
		return res
			.status(400)
			.send('Missing gameCode for ending the voting period');
	}
	const response = await endVoting(gameCode);
	if (!response.success) {
		return res.status(400).send('No gameCode found in database\n');
	}
	// if (!response.canContinue) {
	// 	return res
	// 		.status(409)
	// 		.send('Cannot continue yet, all players must vote first');
	// }
	res.json(response);
});

server.post('/api/game/player/sleep/:gameCode/:playerId', async (req, res) => {
	const { gameCode, playerId } = req.params;
	if (!gameCode || !playerId) {
		return res
			.status(400)
			.send('Missing gameCode or playerId for going to sleep');
	}
	const response = await playerSleeps(gameCode, playerId);
	if (!response.success) {
		return res.status(400).send('No gameCode or playerId found in database\n');
	}
	res.json(response);
});

server.post('/api/game/player/wake/:gameCode/:playerId', async (req, res) => {
	const { gameCode, playerId } = req.params;
	if (!gameCode || !playerId) {
		return res.status(400).send('Missing gameCode or playerId for waking up');
	}
	const response = await playerWakes(gameCode, playerId);
	if (!response.canContinue) {
		return res
			.status(400)
			.send('Cannot continue until host has read night view script');
	}
	if (!response.success) {
		return res.status(400).send('No gameCode or playerId found in database\n');
	}
	res.json(response);
});

server.post(
	'/api/game/player/kill/:gameCode/:playerId/:victimPlayerId',
	async (req, res) => {
		const { gameCode, playerId, victimPlayerId } = req.params;
		if (!gameCode || !playerId || !victimPlayerId) {
			return res
				.status(400)
				.send('Missing gameCode, playerId, or victimPlayerId for waking up');
		}
		const response = await werewolfKills(gameCode, playerId, victimPlayerId);
		if (!response.canContinue) {
			return res
				.status(400)
				.send('Cannot continue until host has read night view script');
		}
		if (!response.success) {
			return res
				.status(400)
				.send('No gameCode or playerIds found in database\n');
		}
		res.json(response);
	}
);

server.post(
	'/api/game/player/begin-voting/:gameCode/:playerId',
	async (req, res) => {
		const { gameCode, playerId } = req.params;
		if (!gameCode || !playerId) {
			return res
				.status(400)
				.send('Missing gameCode or playerId to begin voting');
		}
		const response = await playerReadyToVote(gameCode, playerId);
		// if (!response.canContinue) {
		// 	return res.status(400).send('Cannot continue until host has woken up');
		// }
		if (!response.success) {
			return res
				.status(400)
				.send('No gameCode or playerId found in database\n');
		}
		res.json(response);
	}
);

server.post(
	'/api/game/player/vote/:gameCode/:playerId/:voteId',
	async (req, res) => {
		const { gameCode, playerId, voteId } = req.params;
		if ((!gameCode, !playerId, !voteId)) {
			return res
				.status(400)
				.send('Missing gameCode, playerId, or voteId for voting');
		}
		const response = await playerVote(gameCode, playerId, voteId);
		if (!response.success) {
			return res
				.status(400)
				.send('No gameCode of playerId found in database\n');
		}
		res.json(response);
	}
);

server.get('/api/game/player/vote/result/:gameCode', async (req, res) => {
	const { gameCode } = req.params;
	if (!gameCode) {
		return res.status(400).send('Missing gameCode for viewing vote results\n');
	}
	const response = await viewVoteResult(gameCode);
	if (!response.success) {
		return res.status(400).send('No gameCode found in database\n');
	}
	res.json(response);
});
