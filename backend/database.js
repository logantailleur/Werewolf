const sqlite3 = require('sqlite3').verbose();
const PLAYER_LIMIT = 6;

function initializeDatabaseTables(db) {
	db.serialize(() => {
		db.run(
			'CREATE TABLE IF NOT EXISTS game(' +
				'game_code CHAR(5) PRIMARY KEY,' +
				'datetime_created DATETIME NOT NULL,' +
				"started CHAR(1) DEFAULT 'n' NOT NULL," +
				'num_players SMALLINT DEFAULT 0 NOT NULL,' +
				"CHECK (started in ('n', 'y'))" +
				');'
		);

		db.run(
			'CREATE TABLE IF NOT EXISTS player(' +
				'game_code CHAR(5),' +
				'player_id CHAR(5),' +
				'player_name VARCHAR(25),' +
				'role VARCHAR(10),' +
				'PRIMARY KEY (game_code, player_id),' +
				'FOREIGN KEY (game_code) REFERENCES game(game_code)' +
				');'
		);
	});
}

const db = new sqlite3.Database('./werewolf.db', (err) => {
	if (err) {
		console.error('Error opening database:', err.message);
	} else {
		console.log('Connected to the database.');
		// Initialize database tables
		initializeDatabaseTables(db);
	}
});

function addGame(gameCode, datetimeCreated) {
	return new Promise((resolve, reject) => {
		let sql = 'INSERT INTO game (game_code, datetime_created) VALUES (?, ?)';
		db.run(sql, [gameCode, datetimeCreated], function (err) {
			if (err) {
				reject({
					success: false,
					message: 'Failed to add new game:' + err.message,
				});
			} else {
				resolve({ success: true, message: 'Game has been added.' });
			}
		});
	});
}

async function startGame(gameCode) {
	let gameAvailable = 'SELECT started FROM game WHERE game_code = ?';
	// Use a Promise to ensure the database query completes before continuing
	return new Promise((resolve, reject) => {
		db.get(gameAvailable, [gameCode], async (err, row) => {
			if (err) {
				reject({
					success: false,
					message: 'Failed to check if game has started: ' + err.message,
				});
			} else if (row && row.started !== 'n') {
				// Game has already started
				resolve({ success: false, message: 'Game has already started.' });
			} else {
				// Game has not started, proceed with updating and assigning roles
				let sql = "UPDATE game SET started = 'y' WHERE game_code = ?";
				db.run(sql, [gameCode], async function (err) {
					if (err) {
						reject({
							success: false,
							message: 'Failed to update game start: ' + err.message,
						});
					} else {
						try {
							// Get all players in the game
							let players = await getAllPlayers(gameCode);
							console.log('before assignment');
							console.log(players);
							// Assign roles to players
							await assignRoles(gameCode, players);

							players = await getAllPlayers(gameCode);
							console.log('after assignment');
							console.log(players);

							await printDB();
							// Game started successfully
							resolve({ success: true, message: 'Successfully started game.' });
						} catch (error) {
							reject({
								success: false,
								message: 'Failed to assign roles: ' + error.message,
							});
						}
					}
				});
			}
		});
	});
}

async function getAllPlayers(gameCode) {
	return new Promise((resolve, reject) => {
		let sql = 'SELECT player_id FROM player WHERE game_code = ?';
		db.all(sql, [gameCode], (err, rows) => {
			if (err) {
				reject(err);
			} else {
				let players = rows.map((row) => row.player_id);
				resolve(players);
			}
		});
	});
}

async function assignRoleToPlayer(gameCode, playerID, role) {
	return new Promise((resolve, reject) => {
		let sql =
			'UPDATE player SET role = ? WHERE game_code = ? AND player_id = ?';
		db.run(sql, [role, gameCode, playerID], function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

function joinGame(gameCode, playerID, playerName) {
	return new Promise((resolve, reject) => {
		let gameOpenQuery =
			'SELECT started, num_players FROM game WHERE game_code = ?';
		db.get(gameOpenQuery, [gameCode], (err, row) => {
			if (err) {
				reject({ success: false, message: err.message });
			} else if (row && row.started !== 'n') {
				// Game has already started
				resolve({ success: false, message: 'Game has already started.' });
			} else if (row && row.num_players >= PLAYER_LIMIT) {
				// Game is full
				resolve({ success: false, message: 'Game is full.' });
			} else {
				const playerInsert =
					'INSERT INTO player (game_code, player_id, player_name) VALUES (?, ?, ?)';
				db.run(playerInsert, [gameCode, playerID, playerName], function (err) {
					if (err) {
						reject({
							success: false,
							message: 'Failed to add new player: ' + err.message,
						});
					} else {
						const gameUpdate =
							'UPDATE game SET num_players = num_players + 1 WHERE game_code = ?';
						db.run(gameUpdate, [gameCode], function (err) {
							if (err) {
								reject({
									success: false,
									message: 'Failed to update player count: ' + err.message,
								});
							} else {
								resolve({
									success: true,
									message: 'Successfully added player.',
								});
							}
						});
					}
				});
			}
		});
	});
}

function getRole(gameCode, playerID) {
	return new Promise((resolve, reject) => {
		let roleQuery =
			'SELECT role FROM player WHERE game_code = ? AND player_id = ?';
		db.get(roleQuery, [gameCode, playerID], (err, row) => {
			if (err) {
				reject({
					success: false,
					role: null,
					message: 'Failed to get role: ' + err.message,
				});
			} else if (row) {
				resolve({
					success: true,
					role: row.role,
					message: 'Successfully retrieved player role.',
				});
			} else {
				resolve({
					success: false,
					role: null,
					message: 'Incorrect game code or player id.',
				});
			}
		});
	});
}

function closeDb(db) {
	db.close((err) => {
		if (err) {
			console.error('Error closing database:', err.message);
		} else {
			console.log('Database connection closed.');
		}
	});
}

function wipeDb(db) {
	let sql = 'DELETE FROM game';
	db.run(sql, [], function (err) {
		if (err) {
			return { success: false, message: 'Failed to wipe game:' + err.message };
		}
	});
	sql = 'DELETE FROM player';
	db.run(sql, [], function (err) {
		if (err) {
			return {
				success: false,
				message: 'Failed to wipe player:' + err.message,
			};
		}
	});
	return { success: true, message: 'Successfully wiped db' };
}

async function printDB() {
	let sql = 'SELECT * FROM game';
	try {
		const rows = await new Promise((resolve, reject) => {
			db.all(sql, [], (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
		rows.forEach((row) => {
			console.log(row);
		});

		sql = 'SELECT * FROM player';
		const playerRows = await new Promise((resolve, reject) => {
			db.all(sql, [], (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
		playerRows.forEach((row) => {
			console.log(row);
		});
	} catch (err) {
		console.error(err);
	}
}

async function assignRoles(gameCode, players) {
	// Shuffle players to randomize role assignment
	players = shuffleArray(players);
	// Assign one player as the werewolf and others as villagers
	let werewolfID = players[0]; // Select the first player as the werewolf
	for (let i = 0; i < players.length; i++) {
		let role = players[i] === werewolfID ? 'werewolf' : 'villager';
		await assignRoleToPlayer(gameCode, players[i], role);
	}
}

function shuffleArray(array) {
	// Fisher-Yates shuffle algorithm
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	console.log(array);
	return array;
}

// Export the database object
module.exports = {
	addGame,
	startGame,
	joinGame,
	getRole,
	closeDb,
	wipeDb,
	printDB,
};
