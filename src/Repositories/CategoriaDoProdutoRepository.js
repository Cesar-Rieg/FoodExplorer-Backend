const SqliteConnection = require("../Database/Sqlite");

class CategoriaDoProdutoRepository {
    async GetCategoriaDoProdutoByDiscriminatorAsync(discriminator) {
        const database = await SqliteConnection();

        return await database.get(`
            SELECT 
                Id,
                Nome,
                DataDeCadastro, 
                DataDeAlteracao
            FROM 
                CategoriaDoProduto
            WHERE
                Excluido = 0
                AND Discriminator = (?)
        `, [discriminator]);
    }
}

module.exports = CategoriaDoProdutoRepository;