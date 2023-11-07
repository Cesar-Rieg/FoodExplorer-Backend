const SqliteConnection = require("../../sqlite");

const CreateTableImagem = require("./CreateTableImagem.js");
const CreateTablePerfilDeUsuario = require("./CreateTablePerfilDeUsuario.js");
const CreateTableUsuario = require("./CreateTableUsuario.js");

const CreateTableCategoriaDoProduto = require("./CreateTableCategoriaDoProduto.js");
const CreateTableProduto = require("./CreateTableProduto.js");
const CreateTableProdutoInsumo = require("./CreateTableProdutoInsumo.js");

async function RunMigrations(){
    const Schemas = [
        CreateTableImagem,
        CreateTablePerfilDeUsuario,
        CreateTableUsuario,
        CreateTableCategoriaDoProduto,
        CreateTableProduto,
        CreateTableProdutoInsumo
    ].join('');

    SqliteConnection()
        .then(db => db.exec(Schemas))
        .catch(ex => console.error(ex));
}

module.exports = RunMigrations;
