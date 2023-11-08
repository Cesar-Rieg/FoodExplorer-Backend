const SqliteConnection = require("../Database/Sqlite");

class ImagemRepository {
    async AdicionarImagemAsync(imagemDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            imagemDto.Id,
            imagemDto.Discriminator,
            imagemDto.NomeDoArquivo
        ];

        return await database.run(`
            INSERT INTO Imagem
                (Id, Discriminator, NomeDoArquivo)
            VALUES 
                (?, ?, ?)
        `, parametrosSql);
    }
}

module.exports = ImagemRepository;