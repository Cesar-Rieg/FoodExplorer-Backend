const ApiException = require("../Exception/ApiException.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");
const ProdutoRepository = require("../Repositories/ProdutoRepository.js");

class ProdutoValidator {
    async AdicionarProdutoValidateRequestAsync(produtoRequestDto) {
        await this.ApplyRulesToProdutoRequestDto(produtoRequestDto);
        await this.ApplyRulesToNomeAsync(produtoRequestDto);
        await this.ApplyRulesToDescricaoAsync(produtoRequestDto);
        await this.ApplyRulesToCategoriaAsync(produtoRequestDto);
        await this.ApplyRulesToImagemAsync(produtoRequestDto);
        await this.ApplyRulesToPrecoAsync(produtoRequestDto);
        await this.ApplyRulesToIngredientesAsync(produtoRequestDto);
    }

    async AlterarProdutoValidateRequestAsync(produtoRequestDto) {
        await this.ApplyRulesToProdutoRequestDto(produtoRequestDto);
        await this.ApplyRulesToNomeAsync(produtoRequestDto);
        await this.ApplyRulesToDescricaoAsync(produtoRequestDto);
        await this.ApplyRulesToCategoriaAsync(produtoRequestDto);
        await this.ApplyRulesToImagemAsync(produtoRequestDto);
        await this.ApplyRulesToPrecoAsync(produtoRequestDto);
        await this.ApplyRulesToIngredientesAsync(produtoRequestDto);
        await this.ExistsByIdAsync(produtoRequestDto);
    }

    async GetProdutoByIdValidateRequestAsync(produtoRequestDto) {
        await this.ApplyRulesToIdAsync(produtoRequestDto);
        await this.ExistsByIdAsync(produtoRequestDto);
    }

    async DeletarProdutoValidateRequestAsync(produtoRequestDto) {
        await this.ApplyRulesToProdutoRequestDto(produtoRequestDto);
        await this.ApplyRulesToIdAsync(produtoRequestDto);
        await this.ExistsByIdAsync(produtoRequestDto);
    }

    // Apply Rules
    async ApplyRulesToCategoriaAsync(produtoRequestDto) {
        if (produtoRequestDto.Categoria === null || produtoRequestDto.Categoria?.trim() === "" || produtoRequestDto.Categoria === undefined) {
            throw new ApiException("A categoria do produto é obrigatória.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToDescricaoAsync(produtoRequestDto) {
        if (produtoRequestDto.Descricao === null || produtoRequestDto.Descricao?.trim() === "" || produtoRequestDto.Descricao === undefined) {
            throw new ApiException("A descrição do produto é obrigatória.", HttpStatusCode.BadRequest);
        }

        return true;
    }
   
    async ApplyRulesToIdAsync(produtoRequestDto) {
        if (produtoRequestDto.Id === null || produtoRequestDto.Id?.trim() === "" || produtoRequestDto.Id === undefined) {
            throw new ApiException("O Id do produto é obrigatório.", HttpStatusCode.BadRequest);
        }

        if (produtoRequestDto.Id.length != 36) {
            throw new ApiException("O Id do produto não está no formato correto.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToImagemAsync(produtoRequestDto) {
        if (produtoRequestDto.Imagem === null || produtoRequestDto.Imagem?.trim() === "" || produtoRequestDto.Imagem === undefined) {
            throw new ApiException("A imagem do produto é obrigatória.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToIngredientesAsync(produtoRequestDto) {
        if (produtoRequestDto.Ingredientes === null || produtoRequestDto.Imagem === undefined || produtoRequestDto.Imagem?.length === 0) {
            throw new ApiException("É necessário informar ao menos um ingrediente no produto.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToNomeAsync(produtoRequestDto) {
        if (produtoRequestDto.Nome === null || produtoRequestDto.Nome?.trim() === "" || produtoRequestDto.Nome === undefined) {
            throw new ApiException("O nome do produto é obrigatório.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToPrecoAsync(produtoRequestDto) {
        if (produtoRequestDto.Preco === null || produtoRequestDto.Preco === undefined) {
            throw new ApiException("O preço do produto é obrigatório.", HttpStatusCode.BadRequest);
        }

        if (produtoRequestDto.Preco <= 0) {
            throw new ApiException("O preço do produto deve ser maior que zero.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ApplyRulesToProdutoRequestDto(produtoRequestDto) {
        if (produtoRequestDto === null || produtoRequestDto === undefined) {
            throw new ApiException("O Dto de requisição do produto não pode ser nulo.", HttpStatusCode.BadRequest);
        }

        return true;
    }

    async ExistsByIdAsync(produtoRequestDto) {
        let _produtoRepository = new ProdutoRepository();
        let produto = await _produtoRepository.GetProdutoByIdAsync(produtoRequestDto.Id);

        if (!produto || produto === null || produto === undefined) {
            throw new ApiException("Não foi possível encontrar o produto informado.", HttpStatusCode.BadRequest);
        }

        return true;
    }
}

module.exports = ProdutoValidator;