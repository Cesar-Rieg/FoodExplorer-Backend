const SqliteConnection = require("../Database/Sqlite");

class ProdutoRepository {
    async AdicionarProdutoAsync(produtoDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            produtoDto.Id,
            produtoDto.Nome,
            produtoDto.Descricao,
            produtoDto.Preco,
            produtoDto.CategoriaDoProdutoId,
            produtoDto.ImagemId,
            produtoDto.DataDeCadastro,
            produtoDto.UsuarioDeCadastroId
        ];

        return await database.run(`
            INSERT INTO Produto
                (Id, Nome, Descricao, Preco, CategoriaDoProdutoId, ImagemId, DataDeCadastro, UsuarioDeCadastroId)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?)
        `, parametrosSql);
    }

    async AlterarProdutoAsync(produtoDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            produtoDto.Nome,
            produtoDto.Descricao,
            produtoDto.Preco,
            produtoDto.CategoriaDoProdutoId,
            produtoDto.ImagemId,
            produtoDto.DataDeAlteracao,
            produtoDto.UsuarioDeAlteracaoId,
            produtoDto.Id,
        ];

        return await database.run(`
            UPDATE Produto SET
                Nome = ?, 
                Descricao = ?, 
                Preco = ?, 
                CategoriaDoProdutoId = ?, 
                ImagemId = ?, 
                DataDeAlteracao = ?, 
                UsuarioDeAlteracaoId = ?
            WHERE
                Id = ?
                AND Excluido = 0
        `, parametrosSql);
    }

    async DeletarProdutoAsync(produtoDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            produtoDto.Excluido,
            produtoDto.DataDeExclusao,
            produtoDto.UsuarioDeExclusaoId,
            produtoDto.Id,
        ];

        return await database.run(`
            UPDATE Produto SET
                Excluido = ?, 
                DataDeExclusao = ?, 
                UsuarioDeExclusaoId = ?
            WHERE
                Id = ?
                AND Excluido = 0
        `, parametrosSql);
    }

    async GetAllProdutosAsync(queryWhere) {
        const database = await SqliteConnection();

        let parametrosSql = [];
        let query = this.GetQueryDeSelectPadrao();
        query += queryWhere
        query += ` ORDER BY Produto.Nome `;

        return await database.all(query, parametrosSql);
    }

    async GetProdutoByIdAsync(id) {
        const database = await SqliteConnection();

        let parametrosSql = [id];
        let query = this.GetQueryDeSelectPadrao();
        query += ` AND Produto.Id = ? `;

        return await database.get(query, parametrosSql);
    }

    GetQueryDeSelectPadrao() {
        return `
            SELECT
                Produto.Id,
                Produto.Nome,
                Produto.Descricao,
                Produto.Preco,
                Produto.CategoriaDoProdutoId,
                CategoriaDoProduto.Nome AS NomeDaCategoria,
                Produto.ImagemId,
                Imagem.NomeDoArquivo AS NomeDoArquivoDaImagem,
                Produto.DataDeCadastro,
                Produto.UsuarioDeCadastroId,
                UsuarioDeCadastro.Nome AS NomeDoUsuarioDeCadastro,
                Produto.DataDeAlteracao,
                Produto.UsuarioDeAlteracaoId,
                UsuarioDeAlteracao.Nome AS NomeDoUsuarioDeAlteracao
            FROM
                Produto
                LEFT JOIN CategoriaDoProduto ON Produto.CategoriaDoProdutoId = CategoriaDoProduto.Id
                LEFT JOIN Imagem ON Produto.ImagemId = Imagem.Id
                LEFT JOIN Usuario AS UsuarioDeCadastro ON Produto.UsuarioDeCadastroId = UsuarioDeCadastro.Id
                LEFT JOIN Usuario AS UsuarioDeAlteracao ON Produto.UsuarioDeAlteracaoId = UsuarioDeAlteracao.Id
            WHERE
                Produto.Excluido = 0
        `;
    }
}

module.exports = ProdutoRepository;