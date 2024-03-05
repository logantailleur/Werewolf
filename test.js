const assert = require('node:assert').strict;
const { db, addGame, startGame, joinGame, closeDb, wipeDb, printDB } = require('./database');

describe('Database Operations', function() {
    // before(function(done) {
    //     // Connect to database before tests
    //     db.serialize(() => {
    //         initializeDatabaseTables(db);
    //         done();
    //     });
    // });

    after(function(done) {
        // Close database after tests
        closeDb(db);
        done();
    });

    beforeEach(function(done) {
        // Wipe database before each test
        wipeDb(db);
        done();
    });

    afterEach(function(done) {
        printDB(db);
        done();
    });
 
    it('should add a new game', function() {
        let result = addGame(db, 'ABCDE', '2024-02-26');
        assert(result.success);
        result = addGame(db, '12345', '2024-02-26');
        assert(result.success);
        result = addGame(db, '67890', '2024-02-26');
        assert(result.success);
    });

    it('shouldn\'t allow the same game code twice', function() {
        let result = addGame(db, 'ABCDE', '2024-02-26');
        assert(result.success);
        result = addGame(db, 'ABCDE', '2024-02-26');
        assert(!result.success);
    })

    // Add more test cases for other functions
});
