const { Router } = require("express");

const AutenticacaoController = require("../Controllers/AutenticacaoController.js");

const autenticacaoRoutes = Router();
const _autenticacaoController = new AutenticacaoController();

autenticacaoRoutes.post('/', _autenticacaoController.CriarAutenticacao);

module.exports = autenticacaoRoutes;