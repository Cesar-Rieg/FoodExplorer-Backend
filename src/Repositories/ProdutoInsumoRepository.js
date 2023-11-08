const SqliteConnection = require("../Database/Sqlite");

class ProdutoInsumoRepository {
    async AdicionarProdutoInsumoAsync(produtoInsumoParaAdicionarDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            produtoInsumoParaAdicionarDto.Id,
            produtoInsumoParaAdicionarDto.ProdutoId,
            produtoInsumoParaAdicionarDto.Nome, 
            produtoInsumoParaAdicionarDto.DataDeCriacao,
            produtoInsumoParaAdicionarDto.UsuarioDeCriacaoId
        ];

        return await database.run(`
            INSERT INTO ProdutoInsumo
                (Id, ProdutoId, Nome, DataDeCriacao, UsuarioDeCriacaoId)
            VALUES
                (?, ?, ?, ?, ?)
        `, parametrosSql);
    }

    async DeletarProdutoInsumoDoProdutoAsync(produtoInsumoParaDeletarDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            produtoInsumoParaDeletarDto.Excluido,
            produtoInsumoParaDeletarDto.DataDeExclusao,
            produtoInsumoParaDeletarDto.UsuarioDeExclusaoId,
            produtoInsumoParaDeletarDto.ProdutoId
        ];

        return await database.run(`
            UPDATE ProdutoInsumo SET
                Excluido = ?, 
                DataDeExclusao = ?, 
                UsuarioDeExclusaoId = ?
            WHERE
                ProdutoId = ?
                AND Excluido = 0
        `, parametrosSql);
    }

    async GetAllProdutosInsumosAsync(queryWhere) {
        const database = await SqliteConnection();

        return await database.get(`
            SELECT 
                Id,
                ProdutoId,
                Nome,
                DataDeCriacao, 
                DataDeAlteracao
            FROM 
                ProdutoInsumo
            WHERE
                Excluido = 0
                ${queryWhere}
        `, []);
    }

    async GetProdutoInsumoByProdutoIdAsync(produtoId) {
        const database = await SqliteConnection();

        return await database.get(`
            SELECT 
                Id,
                ProdutoId,
                Nome,
                DataDeCriacao, 
                DataDeAlteracao
            FROM 
                ProdutoInsumo
            WHERE
                ProdutoId = (?)
                AND Excluido = 0
        `, [produtoId]);
    }
}

module.exports = ProdutoInsumoRepository;