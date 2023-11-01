const SqliteConnection = require("../../sqlite");

const CreateTableImagem = require("./CreateTableImagem.js");
const CreateTablePerfilDeUsuario = require("./CreateTablePerfilDeUsuario.js");
const CreateTableUsuario = require("./CreateTableUsuario.js");

async function RunMigrations(){
    const Schemas = [
        CreateTableImagem,
        CreateTablePerfilDeUsuario,
        CreateTableUsuario
    ].join('');

    SqliteConnection()
        .then(db => db.exec(Schemas))
        .catch(ex => console.error(ex));
}

module.exports = RunMigrations;
