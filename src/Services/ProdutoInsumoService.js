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

        for (let i = 0; i < produtoInsumosDto.Ingredientes.length; i++) {
            let produtoInsumoRequestDto = {
                Id: _guidExtensions.NewGuid(),
                ProdutoId: produtoInsumosDto.ProdutoId,
                Nome: produtoInsumosDto.Ingredientes[i], 
                DataDeCadastro: _dateTimeExtensions.DateTimeNow(),
                UsuarioDeCadastroId: produtoInsumosDto.UsuarioId
            };
            let produtoInsumoParaAdicionarDto = Object.assign(produtoInsumoRequestDto);
            
            await _produtoInsumoValidator.AdicionarProdutoInsumoValidateRequestAsync(produtoInsumoRequestDto)
            await _produtoInsumoRepository.AdicionarProdutoInsumoAsync(produtoInsumoParaAdicionarDto);
        }
    }

    // Parametros "ProdutoId" e "UsuarioDeExclusaoId"
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

    // Parâmetro "QueryWhere" contendo a cláusula WHERE responsável pela consulta
    async GetAllProdutosInsumosAsync(queryWhere) {
        let _produtoInsumoRepository = new ProdutoInsumoRepository();
        
        if (!queryWhere || queryWhere === null || queryWhere === undefined) 
            queryWhere = "";

        return await _produtoInsumoRepository.GetAllProdutosInsumosAsync(queryWhere);
    }

    // Parâmetro "ProdutoId"
    async GetProdutoInsumoByProdutoIdAsync(produtoId) {
        let _produtoInsumoRepository = new ProdutoInsumoRepository();
        return await _produtoInsumoRepository.GetProdutoInsumoByProdutoIdAsync(produtoId);
    }
}

module.exports = ProdutoInsumoService;