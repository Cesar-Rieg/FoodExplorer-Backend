const { Router } = require("express");

const ProdutoController = require("../Controllers/ProdutoController.js");

const produtoRoutes = Router();
const _produtoController = new ProdutoController();

produtoRoutes.get('/', _produtoController.ListagemDeProdutos);
produtoRoutes.get('/:id', _produtoController.GetProdutoByIdAsync);

module.exports = produtoRoutes;