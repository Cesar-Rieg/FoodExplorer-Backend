const SqliteConnection = require("../Database/Sqlite");

class ProdutoInsumoRepository {
    async AdicionarProdutoInsumoAsync(produtoInsumoDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            produtoInsumoDto.Id,
            produtoInsumoDto.ProdutoId,
            produtoInsumoDto.Nome, 
            produtoInsumoDto.DataDeCriacao,
            produtoInsumoDto.UsuarioDeCriacaoId,
            produtoInsumoDto.DataDeAlteracao,
            produtoInsumoDto.UsuarioDeAlteracaoId,
            produtoInsumoDto.Excluido,
            produtoInsumoDto.DataDeExclusao,
            produtoInsumoDto.UsuarioDeExclusaoId
        ];

        return await database.run(`
            INSERT INTO ProdutoInsumo
                (Id, ProdutoId, Nome, DataDeCriacao, UsuarioDeCriacaoId, DataDeAlteracao, UsuarioDeAlteracaoId, Excluido, DataDeExclusao, UsuarioDeExclusaoId)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, parametrosSql);
    }

    async DeletarProdutoInsumoByProdutoIdAsync(produtoInsumoDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            produtoInsumoDto.Excluido,
            produtoInsumoDto.DataDeExclusao,
            produtoInsumoDto.UsuarioDeExclusaoId,
            produtoInsumoDto.ProdutoId
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