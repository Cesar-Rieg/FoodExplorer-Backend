const ProdutoService = require("../Services/ProdutoService.js");
const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");

class ProdutoController {
    async AdicionarProdutoAsync(request, response) {
        let _produtoService = new ProdutoService();
        
        let { nome, descricao, categoria, preco, ingredientes } = request.body;
        let arrayDeIngredientes = JSON.parse(ingredientes || '[]');
        let imagem = request.file.filename;
        let usuarioId =  request.usuario.id;

        let produtoRequestDto = {
            Nome: nome,
            Descricao: descricao,
            Categoria: categoria,
            Imagem: imagem,
            Preco: preco,
            UsuarioDeCadastroId: usuarioId,
            Ingredientes: arrayDeIngredientes
        };

        await _produtoService.AdicionarProdutoAsync(produtoRequestDto);
        return response.status(HttpStatusCode.Created).json(); 
    }

    async AlterarProdutoAsync(request, response) {
        let _produtoService = new ProdutoService();
        let { id } = request.params;
        let { nome, descricao, categoria, preco, ingredientes, imagemAtual } = request.body;
        let arrayDeIngredientes = JSON.parse(ingredientes || '[]');
        let imagem = request.file?.filename;
        let alterouAImagem = (imagem && (imagem !== null || imagem !== undefined));
        let usuarioId =  request.usuario.id;

        let produtoRequestDto = {
            Id: id,
            Nome: nome,
            Descricao: descricao,
            Categoria: categoria,
            AlterouAImagem: alterouAImagem,
            Imagem: imagem ?? imagemAtual,
            ImagemAtual: imagemAtual,
            Preco: preco,
            UsuarioDeAlteracaoId: usuarioId,
            Ingredientes: arrayDeIngredientes
        };

        await _produtoService.AlterarProdutoAsync(produtoRequestDto);
        return response.status(HttpStatusCode.Ok).json();
    }

    async DeletarProdutoAsync(request, response) {
        let _produtoService = new ProdutoService();
        let { id } = request.params;
        let usuarioId = request.usuario.id;

        let produtoRequestDto = {
            Id: id,
            UsuarioDeExclusaoId: usuarioId,
        };

        await _produtoService.DeletarProdutoAsync(produtoRequestDto);
        return response.status(HttpStatusCode.Ok).json();
    }

    async GetProdutoByIdAsync(request, response) {
        let _produtoService = new ProdutoService();
        let { id } = request.params;
        let produtoRequestDto = { Id: id };
        let produto = await _produtoService.GetProdutoByIdAsync(produtoRequestDto);
        
        return response.status(HttpStatusCode.Ok).json(produto); 
    }

    async ListagemDeProdutos(request, response) {
        let _produtoService = new ProdutoService();
        let { busca } = request.query;
        let produtos = await _produtoService.GetAllProdutosAsync(busca);

        return response.status(HttpStatusCode.Ok).json(produtos); 
    }

    
}

module.exports = ProdutoController;