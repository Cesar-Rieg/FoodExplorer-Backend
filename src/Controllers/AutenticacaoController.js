const UsuarioService = require("../Services/UsuarioService.js");
const ApiException = require("../Exception/ApiException.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");
const Autenticacao = require("../Configurations/Autenticacao.js");
const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

class AutenticacaoController {
    async CriarAutenticacao(request, response) {
        let _usuarioService = new UsuarioService();
        
        let { email, senha } = request.body;

        let usuarioRequestDto = {
            Email: email,
            Senha: senha
        };

        let usuarioContext = await _usuarioService.GetUsuarioByEmailAsync(usuarioRequestDto);
        delete usuarioContext.Senha;

        let senhaValida = await compare(usuarioRequestDto.Senha, usuarioContext.Senha);
        if (!senhaValida) {
            throw new ApiException("E-mail e/ou senha inválidos.", HttpStatusCode.BadRequest);
        }

        let { ChaveSecreta, DataDeExpiracao } = Autenticacao.JWT;
        let token = sign({}, ChaveSecreta, {
           subject: String(usuarioContext.Id),
           expiresIn: DataDeExpiracao 
        });

        return response.json({ 
            usuario: usuarioContext, 
            token: token 
        });
    }
}

module.exports = AutenticacaoController;