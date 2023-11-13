const SqliteConnection = require("../Database/Sqlite");

class ImagemRepository {
    async AdicionarImagemAsync(imagemDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            imagemDto.Id,
            imagemDto.Discriminator,
            imagemDto.NomeDoArquivo,
            imagemDto.DataDeCadastro,
            imagemDto.UsuarioDeCadastroId
        ];

        return await database.run(`
            INSERT INTO Imagem
                (Id, Discriminator, NomeDoArquivo, DataDeCadastro, UsuarioDeCadastroId)
            VALUES 
                (?, ?, ?, ?, ?)
        `, parametrosSql);
    }

    async DeletarImagemAsync(imagemDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            imagemDto.Excluido,
            imagemDto.DataDeExclusao,
            imagemDto.UsuarioDeExclusaoId,
            imagemDto.Id
        ];

        return await database.run(`
            UPDATE Imagem SET
                Excluido = ?,
                DataDeExclusao = ?, 
                UsuarioDeExclusaoId = ?
            WHERE
                Excluido = 0
                AND Id = ?
        `, parametrosSql);
    }
}

module.exports = ImagemRepository;