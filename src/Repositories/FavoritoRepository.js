const SqliteConnection = require("../Database/Sqlite");

class FavoritoRepository {
    async AdicionarFavoritoAsync(favoritoDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            favoritoDto.Id,
            favoritoDto.ProdutoId,
            favoritoDto.UsuarioId,
            favoritoDto.DataDeCadastro
        ];

        let query = `
            INSERT INTO Favorito 
                (Id, ProdutoId, UsuarioId, DataDeCadastro)
            VALUES
                (?, ?, ?, ?)
        `;

        return await database.run(query, parametrosSql);
    }

    async DeletarFavoritoAsync(favoritoDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            favoritoDto.Excluido,
            favoritoDto.DataDeExclusao,
            favoritoDto.ProdutoId,
            favoritoDto.UsuarioId
        ];

        let query = `
            UPDATE Favorito SET
                Excluido = ?,
                DataDeExclusao = ?
            WHERE
                Excluido = 0
                AND ProdutoId = ?
                AND UsuarioId = ?
        `;

        return await database.run(query, parametrosSql);
    }

    async GetAllFavoritosByUsuarioAsync(favoritoDto) {
        const database = await SqliteConnection();

        let parametrosSql = [ favoritoDto.UsuarioId ];

        let query = `
            SELECT
                Favorito.Id,
                Favorito.ProdutoId,
                Produto.Nome AS NomeDoProduto,
                Produto.ImagemId As ImagemDoProdutoId,
                Imagem.NomeDoArquivo AS NomeDoArquivoDaImagem,
                Produto.CategoriaDoProdutoId,
                CategoriaDoProduto.Nome AS NomeDaCategoriaDoProduto,
                Favorito.UsuarioId,
                Usuario.Nome AS NomeDoUsuario,
                Favorito.DataDeCadastro AS DataDeCadastroDoFavorito
            FROM
                Favorito
                INNER JOIN Produto ON Favorito.ProdutoId = Produto.Id
                INNER JOIN CategoriaDoProduto ON Produto.CategoriaDoProdutoId = CategoriaDoProduto.Id
                INNER JOIN Imagem ON Produto.ImagemId = Imagem.Id
                INNER JOIN Usuario ON Favorito.UsuarioId = Usuario.Id
            WHERE
                Favorito.Excluido = 0
                AND Produto.Excluido = 0
                AND Favorito.UsuarioId = ?
        `;

        return database.all(query, parametrosSql);
    }
}

module.exports = FavoritoRepository;