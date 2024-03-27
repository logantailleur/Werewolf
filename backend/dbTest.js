const {db, addGame, startGame, joinGame, closeDb, wipeDb, printDB} = require("./database");
const assert = require('assert');

function testAdd(db) {
    console.log("Testing game add...")
    let result = addGame(db, '12345', '2021-02-15 9:55:12');
    assert(result.success);
    console.log(result);
    result = addGame(db, '23456', '2021-02-15 9:55:12');
    assert(result.success);
    console.log(result);
    result = addGame(db, '78910', '2021-02-15 9:55:12');
    assert(result.success);
    console.log(result);
    
}

function testStart(db) {
    console.log("Testing game start...")
    let result = startGame(db, '12345');
    assert(result.success);
    console.log(result);
}

function testDB() {
    console.log("Testing database...")
    database = db;
    //wipeDb(database)
    testAdd(database);
    printDB(database);
    testStart(database);
    printDB(database);
    //closeDb(database);
}

testDB();
