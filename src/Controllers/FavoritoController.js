const FavoritoService = require("../Services/FavoritoService.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js")

class FavoritoController {
    async AdicionarFavoritoAsync(request, response) {
        let _favoritoService = new FavoritoService();
        let { produtoId } = request.body;
        let usuarioId = request.usuario.id;

        let favoritoRequestDto = {
            ProdutoId: produtoId,
            UsuarioId: usuarioId
        };

        await _favoritoService.AdicionarFavoritoAsync(favoritoRequestDto);
        return response.status(HttpStatusCode.Created).json();
    }

    async DeletarFavoritoAsync(request, response) {
        let _favoritoService = new FavoritoService();
        let { id } = request.params;
        let usuarioId = request.usuario.id;

        let favoritoRequestDto = {
            ProdutoId: id,
            UsuarioId: usuarioId
        };

        await _favoritoService.DeletarFavoritoAsync(favoritoRequestDto);
        return response.status(HttpStatusCode.Ok).json();
    }

    async GetAllFavoritosByUsuarioAsync(request, response) {
        let _favoritoService = new FavoritoService();
        let usuarioId = request.usuario.id;
        let favoritos = await _favoritoService.GetAllFavoritosByUsuarioAsync(usuarioId);
        return response.status(HttpStatusCode.Ok).json(favoritos);
    }
}

module.exports = FavoritoController;