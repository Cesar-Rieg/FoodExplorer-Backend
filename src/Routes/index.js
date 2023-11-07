const { Router } = require("express");
const AutenticacaoRoutes = require("./Autenticacao.Routes.js");
const ProdutoRoutes = require("./Produto.Routes.js");
const UsuarioRoutes = require("./Usuario.Routes.js");

const routes = Router();
routes.use('/usuarios', UsuarioRoutes);
routes.use('/produtos', ProdutoRoutes);
routes.use('/autenticacao', AutenticacaoRoutes);

module.exports = routes;