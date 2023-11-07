const CategoriaDoProdutoRepository = require("../Repositories/CategoriaDoProdutoRepository.js");
const CategoriaDoProdutoValidator = require("../Validators/CategoriaDoProdutoValidator.js");

class CategoriaDoProdutoService {
    async GetCategoriaDoProdutoByDiscriminatorAsync(discriminator) {
        let _categoriaDoProdutoRepository = new CategoriaDoProdutoRepository();
        let _categoriaDoProdutoValidator = new CategoriaDoProdutoValidator();

        let categoriaDoProduto = await _categoriaDoProdutoRepository.GetCategoriaDoProdutoByDiscriminatorAsync(discriminator);
        await _categoriaDoProdutoValidator.GetCategoriaDoProdutoByDiscriminatorValidateResponseAsync(categoriaDoProduto);

        return categoriaDoProduto;
    }
}

module.exports = CategoriaDoProdutoService;