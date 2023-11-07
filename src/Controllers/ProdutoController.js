const ProdutoService = require("../Services/ProdutoService.js");

class ProdutoController {
    async GetAllProdutosAsync(request, response) {
        let _produtoService = new ProdutoService();
        let produtos = await _produtoService.GetAllProdutosAsync();
        
        console.log(produtos);

        return response.status(200).json(produtos);
    }
}

module.exports = ProdutoController;