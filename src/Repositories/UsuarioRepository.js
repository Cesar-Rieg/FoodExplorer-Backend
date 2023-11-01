const SqliteConnection = require("../Database/Sqlite");

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

        const query = ` 
        INSERT INTO Usuario
            (Id, Nome, Email, Senha, PerfilDeUsuarioId, DataDeCriacao)
        VALUES
            (
                '${parametrosSql[0]}',
                '${parametrosSql[1]}',
                '${parametrosSql[2]}',
                '${parametrosSql[3]}',
                '${parametrosSql[4]}',
                '${parametrosSql[5]}'
            );`

        console.log(query)


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

        return await database.get(`
            SELECT
                Usuario.Id,
                Usuario.Nome,
                Usuario.Email,
                Usuario.Senha,
                Usuario.ImagemId,
                Imagem.Url AS UrlDaImagem,
                Usuario.PerfilDeUsuarioId,
                PerfilDeUsuario.Discriminator AS PerfilDeUsuarioDescriminator,
                Usuario.DataDeCriacao,
                Usuario.DataDeAlteracao
            FROM 
                Usuario
                INNER JOIN PerfilDeUsuario ON Usuario.PerfilDeUsuarioId = PerfilDeUsuario.Id
                LEFT JOIN Imagem ON Usuario.ImagemId = Imagem.Id
            WHERE
                Usuario.Email = (?)
        `, [email]);
    }

    async GetUsuarioByIdAsync(id) {
        const database = await SqliteConnection();

        return await database.get(`
            SELECT
                Usuario.Id,
                Usuario.Nome,
                Usuario.Email,
                Usuario.Senha,
                Usuario.ImagemId,
                Imagem.Url AS UrlDaImagem,
                Usuario.PerfilDeUsuarioId,
                PerfilDeUsuario.Discriminator AS PerfilDeUsuarioDescriminator,
                Usuario.DataDeCriacao,
                Usuario.DataDeAlteracao
            FROM 
                Usuario
                INNER JOIN PerfilDeUsuario ON Usuario.PerfilDeUsuarioId = PerfilDeUsuario.Id
                LEFT JOIN Imagem ON Usuario.ImagemId = Imagem.Id
            WHERE
                Usuario.Id = (?)
        `, [id]);
    }
}

module.exports = UsuarioRepository;