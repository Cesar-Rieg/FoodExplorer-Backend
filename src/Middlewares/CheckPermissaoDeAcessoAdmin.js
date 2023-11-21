const ApiException = require("../Exception/ApiException.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");
const UsuarioService = require("../Services/UsuarioService.js");

async function CheckPermissaoDeAcessoAdmin(request, response, next) {
    let _usuarioService = new UsuarioService();
    
    let usuarioRequestDto = { Id: request.usuario.id };
    let usuarioContext = await _usuarioService.GetUsuarioByIdAsync(usuarioRequestDto);

    if (!usuarioContext.IsAdmin) {
        throw new ApiException("Não foi possível realizar esta ação, pois seu perfil de usuário não é administrador.", HttpStatusCode.BadRequest);
    }

    return next();
}

module.exports = CheckPermissaoDeAcessoAdmin;