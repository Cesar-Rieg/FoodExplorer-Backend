const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const DatabaseConstants = require("../DatabaseConstants.js");

const path = require("path");

async function SqliteConnection(){
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", DatabaseConstants.DatabaseName),
        driver: sqlite3.Database
    });

    return database;
}

module.exports = SqliteConnection;
