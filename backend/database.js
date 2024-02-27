const sqlite3 = require('sqlite3').verbose();
const PLAYER_LIMIT = 6;


function initializeDatabaseTables(db) {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS game(" +
                "game_code CHAR(5) PRIMARY KEY," +
                "datetime_created DATETIME NOT NULL," +
                "started CHAR(1) DEFAULT 'n' NOT NULL," +
                "num_players SMALLINT DEFAULT 0 NOT NULL," +
                "CHECK (started in ('n', 'y'))" +
            ");");

        db.run("CREATE TABLE IF NOT EXISTS player(" +
                "game_code CHAR(5)," +
                "player_id CHAR(5)," +
                "player_name VARCHAR(25)," +
                "role VARCHAR(10)," +
                "PRIMARY KEY (game_code, player_id)," +
                "FOREIGN KEY (game_code) REFERENCES game(game_code)" +
            ");");
    });
}


const db = new sqlite3.Database('./db/werewolf.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the database.');
        // Initialize database tables
        initializeDatabaseTables(db);
    }
});

function addGame(db, gameCode, datetimeCreated) {
    let sql = "INSERT INTO game (game_code, datetime_created)" + 
    "VALUES (?, ?)";
    db.run(sql, [gameCode, datetimeCreated], function(err) {
        if (err) {
            return {success: false, message: "Failed to add new game:" + err.message};
        }
    })
    return {success: true, message: "Game has been added."}
}

function startGame(db, gameCode) {
    let gameAvailable = "SELECT started " + 
                        "FROM game " + 
                        "WHERE game_code = ?";
    db.get(gameAvailable, [gameCode], (err, row) => {
        if (err) {
            return {success: false, message: "Failed to check if game has started:" + err.message};
        }
        if (row.started != 'n') {
            return {success: false, message: "Game has already started."}
        }
    });
    let sql = "UPDATE GAME" + 
    "SET started = 'y'" + 
    "WHERE game_code = ?";
    db.run(sql, [gameCode], function(err) {
        if (err) {
            return {success: false, message: "Failed to update game start:" + err.message};
        }
    })
    return {success: true, message: "Successfully started game."};
    //Need to update player roles here as well.
}

function joinGame(db, gameCode, playerID, playerName) {
    let gameOpenQuery = "SELECT started, num_players " + 
                        "FROM game " +
                        "WHERE game_code = ?";
    db.get(gameOpenQuery, [gameCode], (err, row) => {
        if (err) {
            return {success: false, message: err.message};
        }
        if (row.started != 'n') {
            return {success: false, message: "Game has already started."}
        }
        if (row.num_players >= PLAYER_LIMIT) {
            return {success: false, message: "Game is full."}
        }
        const playerInsert = "INSERT INTO player (game_code, player_id, player_name) VALUES (?, ?, ?)";
        db.run(playerInsert, [gameCode, playerID, playerName], function(err) {
            if (err) {
                db.run("ROLLBACK");
                return {success: false, message: "Failed to add new player: " + err.message};
            }
        });
        const gameUpdate = "UPDATE game SET num_players = num_players + 1 WHERE game_code = ?";
        db.run(gameUpdate, [gameCode], function(err) {
            if (err) {
                db.run("ROLLBACK");
                return {success: false, message: "Failed to update player count: " + err.message};
            }
            db.run("COMMIT");
        });
        return {success: true, message: "Successfully added player."};
    });
}

function getRole(db, gameCode, playerID) {
    let roleQuery = "SELECT role FROM player " + 
                    "WHERE game_code = ? AND player_id = ?";
    db.get(roleQuery, [gameCode, playerID], (err, row) => {
        if (err) {
            return {success: false, role: null, message: "Failed to get role: " + err.message};
        }
        if (row) {
            return {success: true, role: row.role, message: "Succesfully retrieved player role."};
        }
        else {
            return {success: false, role: null, message: "Incorrect game code or player id."}
        }
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
    let sql = "DELETE FROM game"
    db.run(sql, [], function(err) {
        if (err) {
            return {success: false, message: "Failed to wipe game:" + err.message};
        }
    })
    sql = "DELETE FROM player"
    db.run(sql, [], function(err) {
        if (err) {
            return {success: false, message: "Failed to wipe player:" + err.message};
        }
    })
    return {success: true, message: "Successfully wiped db"};
}

function printDB(db) {
    let sql = "SELECT * FROM game";
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          console.log(row);
        });
      });
    sql = "SELECT * FROM player";
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          console.log(row);
        });
      });
}

// Export the database object
module.exports = {db, addGame, startGame, joinGame, getRole, closeDb, wipeDb, printDB};