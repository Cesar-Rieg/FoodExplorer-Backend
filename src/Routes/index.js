const { Router } = require("express");
const AutenticacaoRoutes = require("./Autenticacao.Routes.js");
const FavoritoRoutes = require("../Routes/Favorito.Routes.js");
const ProdutoRoutes = require("./Produto.Routes.js");
const UsuarioRoutes = require("./Usuario.Routes.js");

const routes = Router();
routes.use('/autenticacao', AutenticacaoRoutes);
routes.use('/favoritos', FavoritoRoutes);
routes.use('/produtos', ProdutoRoutes);
routes.use('/usuarios', UsuarioRoutes);

module.exports = routes;