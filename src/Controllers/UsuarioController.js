const UsuarioService = require("../Services/UsuarioService.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");

class UsuarioController {
    
    async AdicionarUsuarioAsync(request, response) {
        let _usuarioService = new UsuarioService();
        let { nome, email, senha } = request.body;
      
        let usuarioRequestDto = {
            Nome: nome,
            Email: email,
            Senha: senha
        }
        await _usuarioService.AdicionarUsuarioAsync(usuarioRequestDto);
        
        return response.status(HttpStatusCode.Created).json({
            Message: `Usuário ${usuarioRequestDto.Nome} foi criado com sucesso!`
        })
    }

    async AlterarUsuarioAsync(request, response) {
        let _usuarioService = new UsuarioService();
        let { id, nome, email, senha, senhaAnterior } = request.body;

        let usuarioRequestDto = {
            Id: id,
            Nome: nome,
            Email: email,
            Senha: senha,
            SenhaAnterior: senhaAnterior
        };
        await _usuarioService.AlterarUsuarioAsync(usuarioRequestDto);

        return response.status(HttpStatusCode.Ok).json({
            Message: `Usuário ${usuarioRequestDto.Nome} foi alterado com sucesso!`
        }) 
    }
}

module.exports = UsuarioController;