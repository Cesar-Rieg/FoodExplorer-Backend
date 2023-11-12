const CategoriaDoProdutoConstants = require("../Constants/Discriminators/CategoriaDoProdutoConstants.js");
const CategoriaDoProdutoService = require("../Services/CategoriaDoProdutoService.js");
const DateTimeExtensions = require("../Extensions/DateTimeExtensions.js");
const ImagemConstants = require("../Constants/Discriminators/ImagemConstants.js");
const ImagemService = require("../Services/ImagemService.js");
const ProdutoRepository = require("../Repositories/ProdutoRepository.js");
const ProdutoInsumoService = require("../Services/ProdutoInsumoService.js");
const ProdutoValidator = require("../Validators/ProdutoValidator.js");
const GuidExtensions = require("../Extensions/GuidExtensions.js");

class ProdutoService {
    // Parametro produtoRequestDto contendo as propriedades "Nome", "Descricao", "Categoria", "Imagem", "Preco", "UsuarioDeCadastroId" e um Array "Ingredientes"
    async AdicionarProdutoAsync(produtoRequestDto) {
        let _categoriaDoProdutoService = new CategoriaDoProdutoService();
        let _dateTimeExtensions = new DateTimeExtensions();
        let _guidExtensions = new GuidExtensions();
        let _imagemService = new ImagemService();
        let _produtoInsumoService = new ProdutoInsumoService();
        let _produtoRepository = new ProdutoRepository(); 
        let _produtoValidator = new ProdutoValidator();

        await _produtoValidator.AdicionarProdutoValidateRequestAsync(produtoRequestDto);

        let imagemId = await _imagemService.AdicionarImagemAsync(produtoRequestDto.Imagem, ImagemConstants.ImagemDoProduto);
        let categoriaDoProduto = await _categoriaDoProdutoService.GetCategoriaDoProdutoByNomeAsync(produtoRequestDto.Categoria);
        let produtoDto = {
            Id: _guidExtensions.NewGuid(),
            Nome: produtoRequestDto.Nome,
            Descricao: produtoRequestDto.Descricao,
            Preco: produtoRequestDto.Preco,
            CategoriaDoProdutoId: categoriaDoProduto.Id,
            ImagemId: imagemId,
            DataDeCadastro: _dateTimeExtensions.DateTimeNow(),
            UsuarioDeCadastroId: produtoRequestDto.UsuarioDeCadastroId,
            
        };
        let produtoInsumosDto = {
            ProdutoId: produtoDto.Id,
            UsuarioId: produtoDto.UsuarioDeCadastroId,
            Ingredientes: produtoRequestDto.Ingredientes
        }

        await _produtoRepository.AdicionarProdutoAsync(produtoDto);
        await _produtoInsumoService.AdicionarProdutoInsumoAsync(produtoInsumosDto);
    }

    // Parametro produtoId = string
    // Parametro usuarioId = string
    async DeletarProdutoAsync(produtoId, usuarioId) {
        let _produtoRepository = new ProdutoRepository(); 
        let _produtoValidator = new ProdutoValidator();
        let _dateTimeExtensions = new DateTimeExtensions();

        let produtoRequestDto = {
            Id: produtoId,
            Excluido: true,
            DataDeExclusao: _dateTimeExtensions.GetDateTime(),
            UsuarioDeExclusaoId: usuarioId,
        };
        let produtoDto = Object.assign(produtoRequestDto);

        await _produtoValidator.DeletarProdutoValidateRequestAsync(produtoRequestDto);
        return await _produtoRepository.DeletarProdutoAsync(produtoDto);
    }

    // Parametro busca = string
    async GetAllProdutosAsync(busca) {
        let _produtoInsumoService = new ProdutoInsumoService();
        let _produtoRepository = new ProdutoRepository();

        let produtos;
        let produtosInsumos;

        if (busca && busca !== null && busca !== undefined) {
            let filtros = busca.split(" "); 
            let queryWhereProdutoInsumos = this.GetQueryWhereProdutoInsumo(filtros);
            let queryWhereProdutos = this.GetQueryWhereProduto(filtros);

            produtos = await _produtoRepository.GetAllProdutosAsync(queryWhereProdutos);
            produtosInsumos = await _produtoInsumoService.GetAllProdutosInsumosAsync(queryWhereProdutoInsumos);
        }
        else {
            produtos = await _produtoRepository.GetAllProdutosAsync("");
            produtosInsumos = await _produtoInsumoService.GetAllProdutosInsumosAsync("");
        }

        let produtoResponse = produtos.map((produto) => {
            let insumosDoProduto = produtosInsumos.filter((insumo) => insumo.ProdutoId === produto.Id);

            return {
                ...produto,
                Ingredientes: insumosDoProduto
            };
        })

        return produtoResponse;
    }

    // Parametro produtoRequestDto possui apenas uma propriedade "Id"
    async GetProdutoByIdAsync(produtoRequestDto) {
        let _produtoInsumoService = new ProdutoInsumoService();
        let _produtoRepository = new ProdutoRepository();
        let _produtoValidator = new ProdutoValidator();

        await _produtoValidator.GetProdutoByIdValidateRequestAsync(produtoRequestDto);
        let produto = await _produtoRepository.GetProdutoByIdAsync(produtoRequestDto.Id);
        let produtoInsumos = await _produtoInsumoService.GetProdutoInsumoByProdutoIdAsync(produtoRequestDto.Id);

        let retorno = {
            ...produto,
            Ingredientes: produtoInsumos
        };
        return retorno;
    }

    GetQueryWhereProduto(filtros) {
        let queryRetorno = " AND ( ";
        for (let index = 0; index < filtros.length; index++) {
            let filtro = filtros[index];
            let query = `Produto.Nome LIKE '%${filtro}%' OR Produto.Descricao LIKE '%${filtro}%'`; 
           
            if (index != filtros.length - 1) {
                queryRetorno += `${query} OR `; 
            }
            else {
                queryRetorno += `${query}`;
            }
        }
        queryRetorno += " ) ";

        return queryRetorno;
    }

    GetQueryWhereProdutoInsumo(filtros) {
        let queryRetorno = " AND ( ";
        for (let index = 0; index < filtros.length; index++) {
            let filtro = filtros[index];
            let query = `ProdutoInsumo.Nome LIKE '%${filtro}%'`; 
            
            if (index != filtros.length - 1) {
                queryRetorno += `${query} OR `; 
            }
            else {
                queryRetorno += `${query}`;
            }
        }
        queryRetorno += " ) ";

        return queryRetorno;
    }
}

module.exports = ProdutoService;