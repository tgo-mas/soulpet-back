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
            if (new Date(dataDesconto) <= new Date ) {
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

router.put("/produtos/:id", async (req, res) => {
    // Esses são os dados que virão no corpo JSON
    const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body;
    const categorias = ["Higiene", "Brinquedos", "Conforto", "Alimentação", "Roupas"];
    // É necessário checar a existência do Produto
    // SELECT * FROM produtos WHERE id = "req.params.id";
    const produto = await Produto.findByPk(req.params.id);
    // se produto é null => não existe o produto com o id
    try {
        if (produto) {
            // IMPORTANTE: Indicar qual o produto a ser atualizado
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
            // 1º Arg: Dados novos, 2º Arg: Where
            await Produto.update(
                { nome, preco, descricao, desconto, dataDesconto, categoria },
                { where: { id: req.params.id } } // WHERE id = "req.params.id"
            );
            res.json({ message: "O produto foi editado." });
        } else {
            // caso o id seja inválido, a resposta ao cliente será essa
            res.status(404).json({ message: "O produto não foi encontrado." });
        }
    }} catch (err) {
        // caso algum erro inesperado, a resposta ao cliente será essa
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});


// Remove um produto 
router.delete("/produtos/:id", async (req, res) => {
    
    const { id } = req.params;
    // buscar cliente por id
    const produto = await Produto.findOne({ where: { id } });
    try {
      if (produto) {
        await produto.destroy();
        res.status(200).json({ message: "Produto removido." });
      } else {
        res.status(404).json({ message: "Produto não encontrado." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });


module.exports = router;