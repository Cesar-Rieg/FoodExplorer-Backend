const path = require("path");
const DatabaseConstants = require("./src/Database/DatabaseConstants.js");

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "Database", DatabaseConstants.DatabaseName)
    },
    pool: {
      afterCreate: (conn, callback) => conn.run("PRAGMA foreign_keys = ON", callback)
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "Database", "Knex", "Migrations")
    },
    useNullAsDefault: true
  }
};
