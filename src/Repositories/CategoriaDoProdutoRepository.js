const SqliteConnection = require("../Database/Sqlite");

class CategoriaDoProdutoRepository {
    async GetCategoriaDoProdutoByDiscriminatorAsync(discriminator) {
        const database = await SqliteConnection();

        return await database.get(`
            SELECT 
                Id,
                Nome,
                DataDeCriacao, 
                DataDeAlteracao
            FROM 
                CategoriaDoProduto
            WHERE
                Discriminator = (?)
                AND Excluido = 0
        `, [discriminator]);
    }
}

module.exports = CategoriaDoProdutoRepository;