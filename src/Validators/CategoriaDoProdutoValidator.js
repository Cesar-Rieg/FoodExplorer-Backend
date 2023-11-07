const ApiException = require("../Exception/ApiException.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");

class CategoriaDoProdutoValidator {
    async GetCategoriaDoProdutoByDiscriminatorValidateResponseAsync(categoriaDoProduto) {
        if (!categoriaDoProduto || categoriaDoProduto === null || categoriaDoProduto === undefined) {
            throw new ApiException("Não foi possível localizar a categoria do produto com este discriminator.", HttpStatusCode.BadRequest);
        }
    }
}

module.exports = CategoriaDoProdutoValidator;