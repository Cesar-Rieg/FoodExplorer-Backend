const { Router } = require("express");

const UsuarioController = require("../Controllers/UsuarioController.js");

const usuarioRoutes = Router();
const _usuarioController = new UsuarioController();

usuarioRoutes.post('/', _usuarioController.AdicionarUsuarioAsync);
usuarioRoutes.put('/', _usuarioController.AlterarUsuarioAsync);

module.exports = usuarioRoutes;