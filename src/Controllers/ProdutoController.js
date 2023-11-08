const ProdutoService = require("../Services/ProdutoService.js");

class ProdutoController {
    async AdicionarProdutoAsync(request, response) {
        let _produtoService = new ProdutoService();
        
        let { nome, descricao, categoria, preco, ingredientes } = request.body;
        let arrayDeIngredientes = JSON.parse(ingredientes || '[]');
        let imagem = request.file.nomeDoArquivo;
        let usuarioId = request.usuario.id;

        let produtoRequestDto = {
            Nome: nome,
            Descricao: descricao,
            Categoria: categoria,
            Imagem: imagem,
            Preco: preco,
            UsuarioDeCriacaoId: usuarioId,
            Ingredientes: arrayDeIngredientes
        };

        await _produtoService.AdicionarProdutoAsync(produtoRequestDto);
        return response.json(); 
    }

    async ListagemDeProdutos(request, response) {
        let _produtoService = new ProdutoService();
        let { busca } = request.query;

        let produtos = await _produtoService.GetAllProdutosAsync(busca);

        return response.status(200).json(produtos);
    }

    
}

module.exports = ProdutoController;