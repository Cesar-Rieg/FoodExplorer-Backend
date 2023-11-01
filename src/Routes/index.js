const { Router } = require("express");
const UsuarioRoutes = require("./Usuario.Routes.js");

const routes = Router();
routes.use('/usuario', UsuarioRoutes);


module.exports = routes;