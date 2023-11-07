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
            produtoDto.DataDeCriacao,
            produtoDto.UsuarioDeCriacaoId
        ];

        return await database.run(`
            INSERT INTO Produto
                (Id, Nome, Descricao, Preco, CategoriaDoProdutoId, ImagemId, DataDeCriacao, UsuarioDeCriacaoId)
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

    async GetAllProdutosAsync() {
        const database = await SqliteConnection();

        let parametrosSql = [];

        return await database.all(`
            SELECT
                Produto.Id,
                Produto.Nome,
                Produto.Descricao,
                Produto.Preco,
                Produto.CategoriaDoProdutoId,
                CategoriaDoProduto.Nome AS NomeDaCategoria,
                Produto.ImagemId,
                Imagem.Url AS UrlDaImagem,
                Produto.DataDeCriacao,
                Produto.UsuarioDeCriacaoId,
                UsuarioDeCriacao.Nome AS NomeDoUsuarioDeCriacao,
                Produto.DataDeAlteracao,
                Produto.UsuarioDeAlteracaoId,
                UsuarioDeAlteracao.Nome AS NomeDoUsuarioDeAlteracao
            FROM
                Produto
                LEFT JOIN CategoriaDoProduto ON Produto.CategoriaDoProdutoId = CategoriaDoProduto.Id
                LEFT JOIN Imagem ON Produto.ImagemId = Imagem.Id
                LEFT JOIN Usuario AS UsuarioDeCriacao ON Produto.UsuarioDeCriacaoId = UsuarioDeCriacao.Id
                LEFT JOIN Usuario AS UsuarioDeAlteracao ON Produto.UsuarioDeAlteracaoId = UsuarioDeAlteracao.Id
            WHERE
                Produto.Excluido = 0
        `, parametrosSql);
    }

    async GetProdutoByIdAsync(id) {
        const database = await SqliteConnection();

        let parametrosSql = [id];

        return await database.get(`
            SELECT
                Produto.Id,
                Produto.Nome,
                Produto.Descricao,
                Produto.Preco,
                Produto.CategoriaDoProdutoId,
                CategoriaDoProduto.Nome AS NomeDaCategoria,
                Produto.ImagemId,
                Imagem.Url AS UrlDaImagem,
                Produto.DataDeCriacao,
                Produto.UsuarioDeCriacaoId,
                UsuarioDeCriacao.Nome AS NomeDoUsuarioDeCriacao,
                Produto.DataDeAlteracao,
                Produto.UsuarioDeAlteracaoId,
                UsuarioDeAlteracao.Nome AS NomeDoUsuarioDeAlteracao
            FROM
                Produto
                LEFT JOIN CategoriaDoProduto ON Produto.CategoriaDoProdutoId = CategoriaDoProduto.Id
                LEFT JOIN Imagem ON Produto.ImagemId = Imagem.Id
                LEFT JOIN Usuario AS UsuarioDeCriacao ON Produto.UsuarioDeCriacaoId = UsuarioDeCriacao.Id
                LEFT JOIN Usuario AS UsuarioDeAlteracao ON Produto.UsuarioDeAlteracaoId = UsuarioDeAlteracao.Id
            WHERE
                Produto.Id = ?
                AND Produto.Excluido = 0
        `, parametrosSql);
    }
}

module.exports = ProdutoRepository;