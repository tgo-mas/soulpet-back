const Produto = require("../database/produto");
const { Router } = require("express");

const router = Router();

router.get("/produtos", async (req, res) => {
    const {nome, categoria} = req.query;
    const listaProdutos = await Produto.findAll();
    if (nome) {
        const listaNome = await Produto.findAll({ where: { nome: `${nome}` } });
        res.json(listaNome);
    } else if (categoria) {
        const listaCategoria = await Produto.findAll({ where: { categoria: `${categoria}` } });
        res.json(listaCategoria);
    } else {res.json(listaProdutos);}
    
});

router.get("/produtos/:id", async (req, res) => {
    const produto = await Produto.findOne({ where: { id: req.params.id } });
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: "Produto não encontrado." });
    }
});



module.exports = router;