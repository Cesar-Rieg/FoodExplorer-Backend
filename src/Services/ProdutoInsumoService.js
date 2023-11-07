const ProdutoInsumoRepository = require("../Repositories/ProdutoInsumoRepository.js");
const ProdutoInsumoValidator = require("../Validators/ProdutoInsumoValidator.js");

class ProdutoInsumoService {
    async AdicionarProdutoInsumoAsync(produtosInsumosDto) {
        let _produtoInsumoRepository = new ProdutoInsumoRepository();
        let _produtoInsumoValidator = new ProdutoInsumoValidator();

        // continuar as validações de adição de insumos
    }
}

module.exports = ProdutoInsumoService;