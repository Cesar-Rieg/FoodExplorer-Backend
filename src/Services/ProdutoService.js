const ProdutoRepository = require("../Repositories/ProdutoRepository.js");

class ProdutoService {
    async GetAllProdutosAsync() {
        let _produtoRepository = new ProdutoRepository();

        let produtos = await _produtoRepository.GetAllProdutosAsync();

        return produtos;
    }
}

module.exports = ProdutoService;