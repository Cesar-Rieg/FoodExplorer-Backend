const { verify } = require("jsonwebtoken");
const ApiException = require("../Exception/ApiException.js");
const AutenticacaoConfig = require("../Configurations/Autenticacao.js");
const DateTimeExtensions = require("../Extensions/DateTimeExtensions.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");

function UsuarioAutenticado(request, response, next) {
    let _dateTimeExtensions = new DateTimeExtensions();
    let authHeader = request.headers.authorization;

    if (!authHeader || authHeader === null || authHeader === undefined) {
        throw new ApiException("JWT Token não informado.", HttpStatusCode.Unauthorized);
    }

    let jwt = authHeader.replace("Bearer ", "");

    try {
        const subject = verify(jwt, AutenticacaoConfig.JWT.ChaveSecreta);

        const sub = subject.sub; // Id do usuário;
        let dataAtual = _dateTimeExtensions.DateTimeNow();
        let dataDeCriacaoDoToken = _dateTimeExtensions.ParseDateTime(subject.iat); // Data de criação do token
        let dataDeExpiracaoDoToken = _dateTimeExtensions.ParseDateTime(subject.exp); // Data de expiração do token
   
        if (dataDeExpiracaoDoToken < dataAtual) {
            throw new ApiException("Este token está expirado. Realize o login novamente para gerar um novo token.", HttpStatusCode.Unauthorized);
        }

        request.usuario = { id: sub };

        return next();
    }
    catch {
        throw new ApplicationError("JWT Token inválido.", HttpStatusCode.Unauthorized);
    }
}

module.exports = UsuarioAutenticado;