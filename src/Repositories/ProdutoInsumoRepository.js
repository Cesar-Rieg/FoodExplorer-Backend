const SqliteConnection = require("../Database/Sqlite");

class ProdutoInsumoRepository {
    async AdicionarProdutoInsumoAsync(produtoInsumoParaAdicionarDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            produtoInsumoParaAdicionarDto.Id,
            produtoInsumoParaAdicionarDto.ProdutoId,
            produtoInsumoParaAdicionarDto.Nome, 
            produtoInsumoParaAdicionarDto.DataDeCadastro,
            produtoInsumoParaAdicionarDto.UsuarioDeCadastroId
        ];

        return await database.run(`
            INSERT INTO ProdutoInsumo
                (Id, ProdutoId, Nome, DataDeCadastro, UsuarioDeCadastroId)
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

        let parametrosSql = [];
        let query = this.GetQueryDeSelectPadrao();
        query += queryWhere;
        
        return await database.all(query, parametrosSql);
    }

    async GetProdutoInsumoByProdutoIdAsync(produtoId) {
        const database = await SqliteConnection();

        let parametrosSql = [produtoId];
        let query = this.GetQueryDeSelectPadrao();
        query += " AND ProdutoInsumo.ProdutoId = (?) ";

        return await database.all(query, parametrosSql);
    }

    GetQueryDeSelectPadrao() {
        return `
            SELECT 
                ProdutoInsumo.Id,
                ProdutoInsumo.ProdutoId,
                ProdutoInsumo.Nome,
                ProdutoInsumo.DataDeCadastro,
                ProdutoInsumo.UsuarioDeCadastroId,
                UsuarioDeCadastro.Nome AS NomeDoUsuarioDeCadastro,
                ProdutoInsumo.DataDeAlteracao,
                ProdutoInsumo.UsuarioDeAlteracaoId,
                UsuarioDeAlteracao.Nome AS NomeDoUsuarioDeAlteracao
            FROM 
                ProdutoInsumo
                LEFT JOIN Usuario AS UsuarioDeCadastro ON ProdutoInsumo.UsuarioDeCadastroId = UsuarioDeCadastro.Id
                LEFT JOIN Usuario AS UsuarioDeAlteracao ON ProdutoInsumo.UsuarioDeAlteracaoId = UsuarioDeAlteracao.Id
            WHERE
                ProdutoInsumo.Excluido = 0
        `;
    }
}

module.exports = ProdutoInsumoRepository;