const { Router } = require("express");

const ProdutoController = require("../Controllers/ProdutoController.js");

const produtoRoutes = Router();
const _produtoController = new ProdutoController();

produtoRoutes.get('/', _produtoController.GetAllProdutosAsync);

module.exports = produtoRoutes;