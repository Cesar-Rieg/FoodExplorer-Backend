const ApiException = require("../Exception/ApiException.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");

class PerfilDeUsuarioValidator {
    async GetPerfilDeUsuarioByDiscriminatorValidateResponseAsync(perfilDeUsuario) {
        if (perfilDeUsuario === null || perfilDeUsuario === undefined) {
            throw new ApiException("Não foi possível localizar um perfil de usuário com este discriminator.", HttpStatusCode.BadRequest);
        }
    }
}

module.exports = PerfilDeUsuarioValidator;