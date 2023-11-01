const SqliteConnection = require("../Database/Sqlite");

class PerfilDeUsuarioRepository {
    async GetPerfilDeUsuarioByDiscriminatorAsync(discriminator) {
        const database = await SqliteConnection();

        return await database.get(`
            SELECT 
                Id,
                Discriminator
            FROM 
                PerfilDeUsuario
            WHERE
                Discriminator = (?)
        `, [discriminator]);
    }
}

module.exports = PerfilDeUsuarioRepository;