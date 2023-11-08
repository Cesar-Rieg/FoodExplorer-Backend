const SqliteConnection = require("../Database/Sqlite");
const PerfilDeUsuarioConstants = require("../Constants/Discriminators/PerfilDeUsuarioConstants.js");

class UsuarioRepository {

    async AdicionarUsuarioAsync(usuarioDto) {
        const database = await SqliteConnection();
       
        let parametrosSql = [
            usuarioDto.Id,
            usuarioDto.Nome,
            usuarioDto.Email,
            usuarioDto.Senha,
            usuarioDto.PerfilDeUsuarioId,
            usuarioDto.DataDeCriacao
        ];

        return await database.run(`
            INSERT INTO Usuario
                (Id, Nome, Email, Senha, PerfilDeUsuarioId, DataDeCriacao)
            VALUES
                (?, ?, ?, ?, ?, ?);
        `, parametrosSql);
    }

    async AlterarImagemDoUsuarioAsync(usuarioDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
            usuarioDto.ImagemId,
            usuarioDto.DataDeAlteracao,
            usuarioDto.Id
        ];

        return await database.run(`
            UPDATE Usuario SET
                ImagemId = ?,
                DataDeAlteracao = ?
            WHERE
                Id = ?
        `, parametrosSql);
    }

    async AlterarUsuarioAsync(usuarioDto) {
        const database = await SqliteConnection();

        let parametrosSql = [
           usuarioDto.Nome,
           usuarioDto.Email,
           usuarioDto.Senha,
           usuarioDto.DataDeAlteracao,
           usuarioDto.Excluido,
           usuarioDto.DataDeExclusao,
           usuarioDto.Id
        ];

        return await database.run(`
            UPDATE Usuario SET
                Nome = ?,
                Email = ?,
                Senha = ?,
                DataDeAlteracao = ?,
                Excluido = ?,
                DataDeExclusao = ?
            WHERE
                Id = ?
        `, parametrosSql);
    }

    async GetUsuarioByEmailAsync(email) {
        const database = await SqliteConnection();

        let parametrosSql = [
            PerfilDeUsuarioConstants.Administrador,
            email
        ];

        return await database.get(`
            SELECT
                Usuario.Id,
                Usuario.Nome,
                Usuario.Email,
                Usuario.Senha,
                Usuario.ImagemId,
                Imagem.NomeDoArquivo AS NomeDoArquivoDaImagem,
                Usuario.PerfilDeUsuarioId,
                PerfilDeUsuario.Discriminator AS PerfilDeUsuarioDescriminator,
                (PerfilDeUsuario.Discriminator = (?)) AS IsAdmin,
                Usuario.DataDeCriacao,
                Usuario.DataDeAlteracao
            FROM 
                Usuario
                INNER JOIN PerfilDeUsuario ON Usuario.PerfilDeUsuarioId = PerfilDeUsuario.Id
                LEFT JOIN Imagem ON Usuario.ImagemId = Imagem.Id
            WHERE
                Usuario.Email = (?)
                AND Usuario.Excluido = 0
        `, parametrosSql);
    }

    async GetUsuarioByIdAsync(id) {
        const database = await SqliteConnection();

        let parametrosSql = [
            PerfilDeUsuarioConstants.Administrador,
            id
        ];

        return await database.get(`
            SELECT
                Usuario.Id,
                Usuario.Nome,
                Usuario.Email,
                Usuario.Senha,
                Usuario.ImagemId,
                Imagem.NomeDoArquivo AS NomeDoArquivoDaImagem,
                Usuario.PerfilDeUsuarioId,
                PerfilDeUsuario.Discriminator AS PerfilDeUsuarioDescriminator,
                (PerfilDeUsuario.Discriminator = (?)) AS IsAdmin,
                Usuario.DataDeCriacao,
                Usuario.DataDeAlteracao
            FROM 
                Usuario
                INNER JOIN PerfilDeUsuario ON Usuario.PerfilDeUsuarioId = PerfilDeUsuario.Id
                LEFT JOIN Imagem ON Usuario.ImagemId = Imagem.Id
            WHERE
                Usuario.Id = (?)
                AND Usuario.Excluido = 0
        `, parametrosSql);
    }
}

module.exports = UsuarioRepository;