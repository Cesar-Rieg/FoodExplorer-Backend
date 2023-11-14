const ApiException = require("../Exception/ApiException.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");

class FavoritoValidator {
    async AdicionarFavoritoValidateRequestDtoAsync(favoritoDto) {
        await this.ApplyRulesToFavoritoDtoAsync(favoritoDto);
        await this.ApplyRulesToIdAsync(favoritoDto);
        await this.ApplyRulesToProdutoIdAsync(favoritoDto);
        await this.ApplyRulesToUsuarioIdAsync(favoritoDto);
    }

    async DeletarFavoritoValidateRequestDtoAsync(favoritoDto) {
        await this.ApplyRulesToFavoritoDtoAsync(favoritoDto);
        await this.ApplyRulesToProdutoIdAsync(favoritoDto);
        await this.ApplyRulesToUsuarioIdAsync(favoritoDto);
    }

    async GetAllFavoritosByUsuarioRequestDtoAsync(favoritoDto) {
        await this.ApplyRulesToFavoritoDtoAsync(favoritoDto);
        await this.ApplyRulesToUsuarioIdAsync(favoritoDto);
    }

    // Apply Rules
    async ApplyRulesToFavoritoDtoAsync(favoritoDto) {
        if (!favoritoDto || favoritoDto === null || favoritoDto === undefined) {
            throw new ApiException("O Dto de requisição de favorito não pode ser nulo.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToIdAsync(favoritoDto) {
        if (favoritoDto.Id === null || favoritoDto.Id?.trim() === "" || favoritoDto.Id === undefined) {
            throw new ApiException("O Id do favorito é obrigatório e não pode ser nulo.", HttpStatusCode.BadRequest);
        }

        if (favoritoDto.Id.length != 36) {
            throw new ApiException("O Id do favorito não está no formato correto.", HttpStatusCode.BadRequest);
        }

        return true; 
    }

    async ApplyRulesToProdutoIdAsync(favoritoDto) {
        if (favoritoDto.ProdutoId === null || favoritoDto.ProdutoId?.trim() === "" || favoritoDto.ProdutoId === undefined) {
            throw new ApiException("O Id do produto é obrigatório e não pode ser nulo.", HttpStatusCode.BadRequest);
        }

        if (favoritoDto.ProdutoId.length != 36) {
            throw new ApiException("O Id do produto não está no formato correto.", HttpStatusCode.BadRequest);
        }

        return true; 
    }

    async ApplyRulesToUsuarioIdAsync(favoritoDto) {
        if (favoritoDto.UsuarioId === null || favoritoDto.UsuarioId?.trim() === "" || favoritoDto.UsuarioId === undefined) {
            throw new ApiException("O Id do usuário é obrigatório e não pode ser nulo.", HttpStatusCode.BadRequest);
        }

        if (favoritoDto.UsuarioId.length != 36) {
            throw new ApiException("O Id do usuário não está no formato correto.", HttpStatusCode.BadRequest);
        }

        return true; 
    }
}

module.exports = FavoritoValidator;