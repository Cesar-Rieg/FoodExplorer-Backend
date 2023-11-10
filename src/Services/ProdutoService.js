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
        let categoriaDoProdutoId = await _categoriaDoProdutoService.GetCategoriaDoProdutoByDiscriminatorAsync(produtoRequestDto.Categoria);
        let produtoDto = {
            Id: _guidExtensions.NewGuid(),
            Nome: produtoRequestDto.Nome,
            Descricao: produtoRequestDto.Descricao,
            Preco: produtoRequestDto.Preco,
            CategoriaDoProdutoId: categoriaDoProdutoId,
            ImagemId: imagemId,
            DataDeCadastro: _dateTimeExtensions.DateTimeNow(),
            UsuarioDeCadastroId: produtoRequestDto.UsuarioDeCadastroId,
            
        };
        let produtoInsumosDto = {
            ProdutoId: produtoDto.Id,
            UsuarioId: produtoDto.UsuarioDeCadastroId,
            Ingredientes: produtoRequestDto.Ingredientes
        }

        await _produtoRepository.AdicionarProdutoAsync(produtoRequestDto);
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
            console.log("Entrou no if");
            console.log("ProdutoService => Busca: ", busca);
            let filtros = busca.split(" "); 
            let queryWhereProdutoInsumos = "";
            let queryWhereProdutos = "";

            filtros.forEach(filtro => {
                queryWhereProdutoInsumos += ` OR ( ProdutoInsumo.Nome LIKE '%${filtro}%' ) `;
                queryWhereProdutos += ` OR (
                                               Produto.Nome LIKE '%${filtro}%'
                                               OR 
                                               Produto.Descricao LIKE '%${filtro}%'
                                           ) `;
            });

            produtos = await _produtoRepository.GetAllProdutosAsync(queryWhereProdutos);
            console.log("ProdutoService => produtos: ", produtos);
            produtosInsumos = await _produtoInsumoService.GetAllProdutosInsumosAsync(queryWhereProdutoInsumos);
            console.log("ProdutoService => produtosInsumos: ", produtosInsumos);
        }
        else {
            console.log("Entrou no else");
            produtos = await _produtoRepository.GetAllProdutosAsync("");
            console.log("ProdutoService => produtos: ", produtos);
            produtosInsumos = await _produtoInsumoService.GetAllProdutosInsumosAsync("");
            console.log("ProdutoService => produtosInsumos: ", produtosInsumos);
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
}

module.exports = ProdutoService;