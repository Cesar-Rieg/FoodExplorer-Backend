const { Router } = require("express");
const multer = require("multer");
const UploadDeImagemConfig = require("../Configurations/UploadDeImagem.js");

const ProdutoController = require("../Controllers/ProdutoController.js");
const produtoRoutes = Router();
const usuarioAutenticado = require("../Middlewares/UsuarioAutenticado.js"); 

const _produtoController = new ProdutoController();
const _uploadDeImagem = multer(UploadDeImagemConfig.MULTER);

produtoRoutes.use(usuarioAutenticado);

produtoRoutes.get('/', _produtoController.ListagemDeProdutos);
produtoRoutes.get('/:id', _produtoController.GetProdutoByIdAsync);
produtoRoutes.post('/', _uploadDeImagem.single("imagem"), _produtoController.AdicionarProdutoAsync);
produtoRoutes.put('/:id', _uploadDeImagem.single("imagem"), _produtoController.AlterarProdutoAsync);
produtoRoutes.delete('/:id', _produtoController.DeletarProdutoAsync);

module.exports = produtoRoutes;