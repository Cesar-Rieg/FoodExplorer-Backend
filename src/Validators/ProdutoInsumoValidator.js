const ApiException = require("../Exception/ApiException.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");

class ProdutoInsumoValidator {
    async AdicionarProdutoInsumoValidateRequestAsync(produtoInsumoRequestDto) {
        await this.ApplyRulesToProdutoInsumoRequestDto(produtoInsumoRequestDto);
        await this.ApplyRulesToProdutoIdAsync(produtoInsumoRequestDto);
        await this.ApplyRulesToNomeAsync(produtoInsumoRequestDto);
        await this.ApplyRulesToUsuarioDeCriacaoAsync(produtoInsumoRequestDto);
    }

    async DeletarProdutoInsumoValidateRequestAsync(produtoInsumoRequestDto) {
        await this.ApplyRulesToProdutoInsumoRequestDto(produtoInsumoRequestDto);
    }

    // Apply Rules
    async ApplyRulesToProdutoInsumoRequestDto(produtoInsumoRequestDto) {
        if (produtoInsumoRequestDto === null || produtoInsumoRequestDto === undefined) {
            throw new ApiException("O Dto de requisição do insumo do produto não pode ser nulo.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToProdutoIdAsync(produtoInsumoRequestDto) {
        if (produtoInsumoRequestDto.ProdutoId === null || produtoInsumoRequestDto.ProdutoId === undefined) {
            throw new ApiException("O Id do produto é obrigatório e não pode ser nulo.", HttpStatusCode.BadRequest);
        }

        if (produtoInsumoRequestDto.ProdutoId.length != 36) {
            throw new ApiException("O Id do produto não está no formato correto.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToNomeAsync(produtoInsumoRequestDto) {
        if (produtoInsumoRequestDto.Nome === null || produtoInsumoRequestDto.Nome?.trim() === "" || produtoInsumoRequestDto.Nome === undefined) {
            throw new ApiException("O nome do insumo do produto é obrigatório e não pode ser nulo.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToUsuarioDeCriacaoAsync(produtoInsumoRequestDto) {
        if (produtoInsumoRequestDto.UsuarioDeCriacaoId === null || produtoInsumoRequestDto.UsuarioDeCriacaoId === undefined) {
            throw new ApiException("O Id do usuário de criação é obrigatório e não pode ser nulo.", HttpStatusCode.BadRequest);
        }

        if (produtoInsumoRequestDto.UsuarioDeCriacaoId.length != 36) {
            throw new ApiException("O Id do usuário de criação não está no formato correto.", HttpStatusCode.BadRequest);
        }

        return true;
    }
}

module.exports = ProdutoInsumoValidator;