const Produto = require("../database/produto");
const { Router } = require("express");

const router = Router();

router.get("/produtos", async (req, res) => {
    const { nome, categoria } = req.query;
    const listaProdutos = await Produto.findAll();
    if (nome) {
        const listaNome = await Produto.findAll({ where: { nome: `${nome}` } });
        res.json(listaNome);
    } else if (categoria) {
        const listaCategoria = await Produto.findAll({ where: { categoria: `${categoria}` } });
        res.json(listaCategoria);
    } else { res.json(listaProdutos); }

});

router.get("/produtos/:id", async (req, res) => {
    const produto = await Produto.findOne({ where: { id: req.params.id } });
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: "Produto não encontrado." });
    }
});

router.post("/produtos", async (req, res) => {
    const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body;
    const categorias = ["Higiene", "Brinquedos", "Conforto", "Alimentação", "Roupas"];

    try {
        if ((categoria) && (desconto) && (dataDesconto)) {
            if (desconto < 0 || desconto > 100) {
                res.status(400).json({ message: "Porcentagem de desconto inválida" })
            }
            if (!categorias.includes(categoria)) {
                res.status(400).json({ message: "Categoria inválida" })
            }
            if (new Date >= new Date(dataDesconto)) {
                res.status(400).json({ message: "Data de desconto inválida" })
            }
            const novoProduto = await Produto.create(
                { nome, preco, descricao, desconto, dataDesconto, categoria });
            res.status(201).json(novoProduto);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});



// Remove um produto com o ID especificado
router.delete('/produtos/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndRemove(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto removido com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao remover produto' });
    }
});

// Remove todos os produtos
router.delete('/produtos/all', async (req, res) => {
    try {
        await Produto.deleteMany({});
        res.json({ message: 'Todos os produtos foram removidos com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao remover produtos' });
    }
});



module.exports = router;