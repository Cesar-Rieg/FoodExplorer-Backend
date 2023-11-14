const { Router } = require("express");

const FavoritoController = require("../Controllers/FavoritoController.js");
const favoritoRoutes = Router();
const usuarioAutenticado = require("../Middlewares/UsuarioAutenticado.js"); 

const _favoritoController = new FavoritoController();

favoritoRoutes.use(usuarioAutenticado);

favoritoRoutes.get('/', _favoritoController.GetAllFavoritosByUsuarioAsync);
favoritoRoutes.post('/', _favoritoController.AdicionarFavoritoAsync);
favoritoRoutes.delete('/:id', _favoritoController.DeletarFavoritoAsync);

module.exports = favoritoRoutes;