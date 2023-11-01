const PerfilDeUsuarioRepository = require("../Repositories/PerfilDeUsuarioRepository.js");
const PerfilDeUsuarioValidator = require("../Validators/PerfilDeUsuarioValidator.js");

class PerfilDeUsuarioService {
    async GetPerfilDeUsuarioByDiscriminatorAsync(discriminator) {
        let _perfilDeUsuarioRepository = new PerfilDeUsuarioRepository();
        let _perfilDeUsuarioValidator = new PerfilDeUsuarioValidator();

        let perfilDeUsuario = await _perfilDeUsuarioRepository.GetPerfilDeUsuarioByDiscriminatorAsync(discriminator);
        await _perfilDeUsuarioValidator.GetPerfilDeUsuarioByDiscriminatorValidateResponseAsync(perfilDeUsuario);

        return perfilDeUsuario;
    }
}

module.exports = PerfilDeUsuarioService;