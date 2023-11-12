const DateTimeExtensions = require("../Extensions/DateTimeExtensions.js");
const GuidExtensions = require("../Extensions/GuidExtensions.js");
const ProdutoInsumoRepository = require("../Repositories/ProdutoInsumoRepository.js");
const ProdutoInsumoValidator = require("../Validators/ProdutoInsumoValidator.js");

class ProdutoInsumoService {
    // Parametro produtoInsumoDto contendo as propriedades "ProdutoId", "UsuarioId" e um Array de string "Ingredientes"
    async AdicionarProdutoInsumoAsync(produtoInsumosDto) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _guidExtensions = new GuidExtensions();
        let _produtoInsumoRepository = new ProdutoInsumoRepository();
        let _produtoInsumoValidator = new ProdutoInsumoValidator();

        await this.DeletarProdutoInsumoDoProdutoAsync(produtoInsumosDto.ProdutoId, produtoInsumosDto.UsuarioId);    

        produtoInsumosDto.Ingredientes.forEach(async (insumo) => {
            let produtoInsumoParaAdicionarDto = {
                Id: _guidExtensions.NewGuid(),
                ProdutoId: produtoInsumosDto.ProdutoId,
                Nome: insumo, 
                DataDeCadastro: _dateTimeExtensions.DateTimeNow(),
                UsuarioDeCadastroId: produtoInsumosDto.UsuarioId
            };
            let produtoInsumoRequestDto = Object.assign(produtoInsumoParaAdicionarDto);
            await _produtoInsumoValidator.AdicionarProdutoInsumoValidateRequestAsync(produtoInsumoRequestDto)
            await _produtoInsumoRepository.AdicionarProdutoInsumoAsync(produtoInsumoParaAdicionarDto);
        });
    }

    async DeletarProdutoInsumoDoProdutoAsync(produtoId, usuarioDeExclusaoId) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _produtoInsumoRepository = new ProdutoInsumoRepository();
        let _produtoInsumoValidator = new ProdutoInsumoValidator();

        let produtoInsumoParaDeletarDto = {
            Excluido: true,
            DataDeExclusao: _dateTimeExtensions.DateTimeNow(),
            UsuarioDeExclusaoId: usuarioDeExclusaoId,
            ProdutoId: produtoId
        };

        let produtoInsumoRequestDto = Object.assign(produtoInsumoParaDeletarDto);
        await _produtoInsumoValidator.DeletarProdutoInsumoValidateRequestAsync(produtoInsumoRequestDto);
        return await _produtoInsumoRepository.DeletarProdutoInsumoDoProdutoAsync(produtoInsumoParaDeletarDto);
    }

    async GetAllProdutosInsumosAsync(queryWhere) {
        let _produtoInsumoRepository = new ProdutoInsumoRepository();
        
        if (!queryWhere || queryWhere === null || queryWhere === undefined) 
            queryWhere = "";

        return await _produtoInsumoRepository.GetAllProdutosInsumosAsync(queryWhere);
    }

    async GetProdutoInsumoByProdutoIdAsync(produtoId) {
        let _produtoInsumoRepository = new ProdutoInsumoRepository();
        return await _produtoInsumoRepository.GetProdutoInsumoByProdutoIdAsync(produtoId);
    }
}

module.exports = ProdutoInsumoService;