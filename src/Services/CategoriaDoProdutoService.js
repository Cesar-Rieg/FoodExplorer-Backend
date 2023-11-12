const CategoriaDoProdutoRepository = require("../Repositories/CategoriaDoProdutoRepository.js");
const CategoriaDoProdutoValidator = require("../Validators/CategoriaDoProdutoValidator.js");

class CategoriaDoProdutoService {
    async GetCategoriaDoProdutoByNomeAsync(discriminator) {
        let _categoriaDoProdutoRepository = new CategoriaDoProdutoRepository();
        let _categoriaDoProdutoValidator = new CategoriaDoProdutoValidator();

        let categoriaDoProduto = await _categoriaDoProdutoRepository.GetCategoriaDoProdutoByNomeAsync(discriminator);
        await _categoriaDoProdutoValidator.GetCategoriaDoProdutoByNomeValidateResponseAsync(categoriaDoProduto);

        return categoriaDoProduto;
    }
}

module.exports = CategoriaDoProdutoService;