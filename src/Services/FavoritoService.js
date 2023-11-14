const FavoritoRepository = require("../Repositories/FavoritoRepository.js");
const FavoritoValidator = require("../Validators/FavoritoValidator.js");
const DateTimeExtensions = require("../Extensions/DateTimeExtensions.js")
const GuidExtensions = require("../Extensions/GuidExtensions.js")

class FavoritoService {
    async AdicionarFavoritoAsync(favoritoRequestDto) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _guidExtensions = new GuidExtensions();
        let _favoritoValidator = new FavoritoValidator();
        let _favoritoRepository = new FavoritoRepository();

        let favoritoDto = {
            Id: _guidExtensions.NewGuid(),
            ProdutoId: favoritoRequestDto.ProdutoId,
            UsuarioId: favoritoRequestDto.UsuarioId,
            DataDeCadastro: _dateTimeExtensions.DateTimeNow()
        };
        
        await _favoritoValidator.AdicionarFavoritoValidateRequestDtoAsync(favoritoDto);
        await _favoritoRepository.AdicionarFavoritoAsync(favoritoDto);
    }
    
    async DeletarFavoritoAsync(favoritoRequestDto) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _favoritoValidator = new FavoritoValidator();
        let _favoritoRepository = new FavoritoRepository();

        let favoritoDto = {
            ProdutoId: favoritoRequestDto.ProdutoId,
            UsuarioId: favoritoRequestDto.UsuarioId,
            Excluido: true,
            DataDeExclusao: _dateTimeExtensions.DateTimeNow()
        };
       
        await _favoritoValidator.DeletarFavoritoValidateRequestDtoAsync(favoritoDto);
        await _favoritoRepository.DeletarFavoritoAsync(favoritoDto);
    }
    
    async GetAllFavoritosByUsuarioAsync(usuarioId) {
        let _favoritoValidator = new FavoritoValidator();
        let _favoritoRepository = new FavoritoRepository();

        let favoritoDto = {
            UsuarioId: usuarioId
        };

        await _favoritoValidator.GetAllFavoritosByUsuarioRequestDtoAsync(favoritoDto);
        return await _favoritoRepository.GetAllFavoritosByUsuarioAsync(favoritoDto);
    }
}

module.exports = FavoritoService;