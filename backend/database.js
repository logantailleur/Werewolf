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
				'game_state SMALLINT DEFAULT 1 NOT NULL,' +
				'last_kill CHAR(5),' +
				"CHECK (started in ('n', 'y'))" +
				');'
		);

		db.run(
			'CREATE TABLE IF NOT EXISTS player(' +
				'game_code CHAR(5),' +
				'player_id CHAR(5),' +
				'player_name VARCHAR(25),' +
				'role VARCHAR(10),' +
				'player_state SMALLINT DEFAULT 2,' +
				'voted_player char(5) DEFAULT NULL,' +
				"is_alive CHAR(1) DEFAULT 'y' NOT NULL," +
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
				let sql =
					"UPDATE game SET started = 'y', game_state = 9 WHERE game_code = ?";
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
							// Assign roles to players
							await assignRoles(gameCode, players);

							players = await getAllPlayers(gameCode);

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
			} else if (!row) {
				reject({ success: false, message: 'Invalid game code.' });
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
	return array;
}

async function getAllPlayerRoles(gameCode) {
	return new Promise((resolve, reject) => {
		let sql =
			'SELECT player_id, player_name, role, is_alive FROM player WHERE game_code = ?';
		db.all(sql, [gameCode], (err, rows) => {
			if (err) {
				reject(err);
			} else {
				let players = rows.map((row) => ({
					playerId: row.player_id,
					name: row.player_name,
					role: row.role,
					isAlive: row.is_alive,
				}));
				resolve(players);
			}
		});
	});
}

function canHostContinue(gameCode, neededPlayerState) {
	//Given game code and what state we expect the players to be in, returns true if host can update, false otherwise.
	//Only considers live players.
	return new Promise((resolve, reject) => {
		let sql =
			"SELECT * FROM player WHERE game_code = ? AND is_alive = 'y' AND player_state != ?";
		db.get(sql, [gameCode, neededPlayerState], (err, row) => {
			if (err) {
				resolve({ success: false, canContinue: false, error: err });
			} else if (row) {
				resolve({ success: true, canContinue: false });
			} else {
				resolve({ success: true, canContinue: true });
			}
		});
	});
}

async function hostSleepsDB(gameCode) {
	//All live players must be in state 3 to continue
	return new Promise((resolve, reject) => {
		canHostContinue(gameCode, 3)
			.then((results) => {
				if (results.success) {
					if (results.canContinue) {
						sql = 'UPDATE game SET game_state = 4 WHERE game_code = ?';
						db.run(sql, [gameCode], (err) => {
							if (err) {
								results = { success: false, canContinue: false };
							} else {
								results = { success: true, canContinue: true };
							}
							resolve(results);
						});
					} else {
						resolve(results);
					}
				} else {
					reject(results.error);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
}

async function hostWakesDB(gameCode) {
	return new Promise((resolve, reject) => {
		canHostContinue(gameCode, 5)
			.then((results) => {
				if (results.success) {
					if (results.canContinue) {
						let id = null;
						let sql =
							"SELECT player_id FROM player WHERE role = 'werewolf' AND game_code = ?";
						db.get(sql, [gameCode], (err, row) => {
							if (err) {
								reject(err);
								return; // Return to prevent further execution
							}
							if (row) {
								id = row.player_id;
								sql = 'UPDATE game SET last_kill = ? WHERE game_code = ?';
								db.run(sql, [id, gameCode], (err) => {
									if (err) {
										reject(err);
										return; // Return to prevent further execution
									}
									sql =
										"UPDATE player SET is_alive = 'n' WHERE game_code = ? AND player_id = ?";
									db.run(sql, [gameCode, id], (err) => {
										if (err) {
											reject(err);
											return; // Return to prevent further execution
										}
										sql = 'UPDATE game SET game_state = 6 WHERE game_code = ?';
										db.run(sql, [gameCode], (err) => {
											if (err) {
												results = { success: false, canContinue: false };
											} else {
												results = { success: true, canContinue: true };
											}
											resolve(results);
										});
									});
								});
							} else {
								results = { success: true, canContinue: false };
								resolve(results); // No werewolf found, resolve with existing results
							}
						});
					} else {
						resolve(results); // Game cannot continue, resolve with existing results
					}
				} else {
					reject(results.error); // Reject with error from canHostContinue
				}
			})
			.catch((error) => {
				reject(error); // Reject with error from any of the operations
			});
	});
}

async function endVoteDB(gameCode) {
	return new Promise((resolve, reject) => {
		canHostContinue(gameCode, 8)
			.then((results) => {
				if (results.success) {
					if (results.canContinue) {
						let sql =
							'SELECT * FROM player WHERE game_code = ? AND player_id = (SELECT voted_player FROM player WHERE game_code = ? GROUP BY voted_player ORDER BY COUNT(voted_player) DESC LIMIT 1)';
						db.get(sql, [gameCode, gameCode], (err, row) => {
							if (err) {
								reject(err);
								return;
							}

							if (!row) {
								// No player was killed
								resolve({
									success: true,
									canContinue: true,
									killedPlayer: null,
								});
								return;
							}

							const killedPlayer = {
								playerId: row.player_id,
								name: row.player_name,
								role: row.role,
								status: row.is_alive,
							};

							// Update game_state and is_alive for the killed player
							sql =
								'UPDATE game SET last_kill = ?, game_state = 9 WHERE game_code = ?';
							db.run(sql, [killedPlayer.playerId, gameCode], (err) => {
								if (err) {
									reject(err);
									return;
								}
								sql =
									"UPDATE player SET is_alive = 'n' WHERE game_code = ? AND player_id = ?";
								db.run(sql, [gameCode, killedPlayer.playerId], (err) => {
									if (err) {
										reject(err);
										return;
									}
									resolve({
										success: true,
										canContinue: true,
										victim: killedPlayer,
									});
								});
							});
						});
					} else {
						resolve(results);
					}
				} else {
					reject(results.error);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
}

async function playerSleepsDB(gameCode, playerID) {
	return new Promise((resolve, reject) => {
		let sql = 'SELECT game_state FROM game WHERE game_code = ?';
		db.get(sql, [gameCode], (err, row) => {
			if (err) {
				reject(err);
			}
			if (row.game_state === 9 || row.game_state === 2) {
				sql =
					'UPDATE player SET player_state = 3 WHERE game_code = ? AND player_id = ?';
				db.run(sql, [gameCode, playerID], (err) => {
					if (err) {
						reject(err);
					}
					resolve({ success: true, canContinue: true });
				});
			} else {
				console.log(row);
				resolve({ success: true, canContinue: false });
			}
		});
	});
}

async function playerWakesDB(gameCode, playerID) {
	return new Promise((resolve, reject) => {
		let sql = 'SELECT game_state, last_kill FROM game WHERE game_code = ?';
		db.get(sql, [gameCode], (err, row) => {
			if (err) {
				reject(err);
				return;
			}
			if (row.game_state !== 6) {
				resolve({ success: true, canContinue: false });
				return;
			}

			const lastKillPlayerID = row.last_kill;
			if (!lastKillPlayerID) {
				// No last kill recorded, resolve with null
				resolve({ success: true, canContinue: true, lastKillPlayer: null });
				return;
			}

			// Fetch player row corresponding to last_kill player ID
			sql = 'SELECT * FROM player WHERE game_code = ? AND player_id = ?';
			db.get(sql, [gameCode, lastKillPlayerID], (err, playerRow) => {
				if (err) {
					reject(err);
					return;
				}

				// Update player_state for the current player
				sql =
					'UPDATE player SET player_state = 5 WHERE game_code = ? AND player_id = ?';
				db.run(sql, [gameCode, playerID], (err) => {
					if (err) {
						reject(err);
						return;
					}
					// Resolve with success, canContinue, and the lastKillPlayer row
					resolve({
						success: true,
						canContinue: true,
						lastKillPlayer: {
							name: playerRow.player_name,
							playerId: playerRow.player_id,
							role: playerRow.role,
						},
					});
				});
			});
		});
	});
}

async function werewolfKillsDB(gameCode, playerID, victimID) {
	return new Promise((resolve, reject) => {
		let sql = 'SELECT game_state FROM game WHERE game_code = ?';
		db.get(sql, [gameCode], (err, row) => {
			if (err) {
				reject(err);
				return;
			}
			if (row.game_state !== 4) {
				resolve({ success: true, canContinue: false });
				return;
			}

			// Update player_state and voted_player for the current player
			sql =
				'UPDATE player SET player_state = 5, voted_player = ? WHERE game_code = ? AND player_id = ?';
			db.run(sql, [victimID, gameCode, playerID], (err) => {
				if (err) {
					reject(err);
					return;
				}

				// Mark the victim player as not alive
				sql =
					"UPDATE player SET is_alive = 'n' WHERE game_code = ? AND player_id = ?";
				db.run(sql, [gameCode, victimID], (err) => {
					if (err) {
						reject(err);
						return;
					}

					// Update last_kill on the game table to be the victimId
					sql = 'UPDATE game SET last_kill = ? WHERE game_code = ?';
					db.run(sql, [victimID, gameCode], (err) => {
						if (err) {
							reject(err);
							return;
						}
						resolve({ success: true, canContinue: true });
					});
				});
			});
		});
	});
}

async function playerReadyToVoteDB(gameCode, playerID) {
	return new Promise((resolve, reject) => {
		let sql = 'SELECT game_state FROM game WHERE game_code = ?';
		db.get(sql, [gameCode], (err, row) => {
			if (err) {
				reject(err);
			}
			if (row.game_state !== 6) {
				resolve({ success: true, canContinue: false });
			}
			sql =
				'UPDATE player SET player_state = 7 WHERE game_code = ? AND player_id = ?';
			db.run(sql, [gameCode, playerID], (err) => {
				if (err) {
					reject(err);
				}
				resolve({ success: true, canContinue: true });
			});
		});
	});
}

async function playerVoteDB(gameCode, playerID, votedID) {
	return new Promise((resolve, reject) => {
		// Get a count of all players not in state 7 or 8; if any such players exist, can't continue to state 8.
		let sql =
			'SELECT COUNT(player_state) AS states FROM player WHERE game_code = ? AND NOT (player_state = 7 OR player_state = 8)';
		db.get(sql, [gameCode], (err, row) => {
			if (err) {
				reject(err);
				return;
			}
			if (row.states !== 0) {
				resolve({ success: true, canContinue: false });
				return;
			}
			sql =
				'UPDATE player SET player_state = 8, voted_player = ? WHERE game_code = ? AND player_id = ?';
			db.run(sql, [votedID, gameCode, playerID], (err) => {
				if (err) {
					reject(err);
					return;
				}
				resolve({ success: true, canContinue: true });
			});
		});
	});
}

async function getPlayerByLastKill(gameCode) {
	return new Promise((resolve, reject) => {
		let sql =
			'SELECT player_id, player_name, role FROM player WHERE game_code = ? AND player_id = (SELECT last_kill FROM game WHERE game_code = ?)';
		db.get(sql, [gameCode, gameCode], (err, row) => {
			if (err) {
				reject(err);
				return;
			}
			if (!row) {
				resolve(null); // No player found
			} else {
				resolve({
					success: true,
					canContinue: true,
					player: {
						playerId: row.player_id,
						playerName: row.player_name,
						role: row.role,
					},
				});
			}
		});
	});
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
};
