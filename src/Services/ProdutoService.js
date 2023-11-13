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

        let imagemRequestDto = {
            Discriminator: ImagemConstants.ImagemDoProduto,
            NomeDoArquivo: produtoRequestDto.Imagem,
            UsuarioDeCadastroId: produtoRequestDto.UsuarioDeCadastroId
        };
        let imagemId = await _imagemService.AdicionarImagemAsync(imagemRequestDto);
        
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

    async AlterarProdutoAsync(produtoRequestDto) {
        let _categoriaDoProdutoService = new CategoriaDoProdutoService();
        let _dateTimeExtensions = new DateTimeExtensions();
        let _imagemService = new ImagemService();
        let _produtoInsumoService = new ProdutoInsumoService();
        let _produtoRepository = new ProdutoRepository(); 
        let _produtoValidator = new ProdutoValidator();

        await _produtoValidator.AlterarProdutoValidateRequestAsync(produtoRequestDto);
        let produto = await _produtoRepository.GetProdutoByIdAsync(produtoRequestDto.Id);
        let imagemId = produto.ImagemId;

        if (produtoRequestDto.AlterouAImagem) {
            let imagemRequestDto = {
                Id: produto.ImagemId,
                NomeDoArquivo: produto.NomeDoArquivoDaImagem,
                UsuarioDeAlteracaoId: produtoRequestDto.UsuarioDeAlteracaoId
            };
            await _imagemService.DeletarImagemAsync(imagemRequestDto);
            imagemId = await _imagemService.AdicionarImagemAsync(produtoRequestDto.Imagem, ImagemConstants.ImagemDoProduto);
        }

        let categoriaDoProduto = await _categoriaDoProdutoService.GetCategoriaDoProdutoByNomeAsync(produtoRequestDto.Categoria);
        let produtoDto = {
            Id: produtoRequestDto.Id,
            Nome: produtoRequestDto.Nome ?? produto.Nome,
            Descricao: produtoRequestDto.Descricao ?? produto.Descricao,
            Preco: produtoRequestDto.Preco ?? produto.Preco,
            CategoriaDoProdutoId: categoriaDoProduto.Id,
            ImagemId: imagemId,
            DataDeAlteracao: _dateTimeExtensions.DateTimeNow(),
            UsuarioDeAlteracaoId: produtoRequestDto.UsuarioDeAlteracaoId,
        };
        let produtoInsumosDto = {
            ProdutoId: produtoDto.Id,
            UsuarioId: produtoDto.UsuarioDeAlteracaoId,
            Ingredientes: produtoRequestDto.Ingredientes
        }

        await _produtoRepository.AlterarProdutoAsync(produtoDto);
        await _produtoInsumoService.AdicionarProdutoInsumoAsync(produtoInsumosDto);
    }

    // Parametro produtoRequestDto contendo as propriedades "Id" do produto, e "UsuarioDeExclusaoId"
    async DeletarProdutoAsync(produtoRequestDto) {
        let _dateTimeExtensions = new DateTimeExtensions();
        let _produtoInsumoService = new ProdutoInsumoService();
        let _produtoRepository = new ProdutoRepository(); 
        let _produtoValidator = new ProdutoValidator();

        await _produtoValidator.DeletarProdutoValidateRequestAsync(produtoRequestDto);

        let produtoDto = {
            Id: produtoRequestDto.Id,
            Excluido: true,
            DataDeExclusao: _dateTimeExtensions.DateTimeNow(),
            UsuarioDeExclusaoId: produtoRequestDto.UsuarioDeExclusaoId,
        }

        await _produtoInsumoService.DeletarProdutoInsumoDoProdutoAsync(produtoDto.Id, produtoDto.UsuarioDeExclusaoId);
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
            let objetoQueryWhere = this.GetQueryWhereDeProdutoEProdutoInsumo(filtros);
            
            produtos = await _produtoRepository.GetAllProdutosAsync(objetoQueryWhere.QueryWhereProduto);
            produtosInsumos = await _produtoInsumoService.GetAllProdutosInsumosAsync(objetoQueryWhere.QueryWhereProdutoInsumo);
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

    GetQueryWhereDeProdutoEProdutoInsumo(filtros) {
        let objetoRetorno = {
            QueryWhereProduto: " AND (",
            QueryWhereProdutoInsumo: " AND ("
        };

        for (let index = 0; index < filtros.length; index++) {
            let filtro = filtros[index];

            if (filtro.trim() === "") continue;

            let whereProduto = `Produto.Nome LIKE '%${filtro}%' OR Produto.Descricao LIKE '%${filtro}%'`; 
            let whereProdutoInsumo = `ProdutoInsumo.Nome LIKE '%${filtro}%'`; 
            
            if (index == filtros.length - 1) {
                objetoRetorno.QueryWhereProduto += `${whereProduto}`;
                objetoRetorno.QueryWhereProdutoInsumo += `${whereProdutoInsumo}`;
            }
            else {
                objetoRetorno.QueryWhereProduto += `${whereProduto} OR `;
                objetoRetorno.QueryWhereProdutoInsumo += `${whereProdutoInsumo} OR `;
            }
        }
        objetoRetorno.QueryWhereProduto += ") ";
        objetoRetorno.QueryWhereProdutoInsumo += ") ";

        return objetoRetorno;
    }
}

module.exports = ProdutoService;