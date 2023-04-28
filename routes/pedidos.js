const Cliente = require("../database/cliente");
const Pedido = require("../database/pedido");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

router.get("/pedidos", async (req, res) => {
    const listaPedidos = await Pedido.findAll();
    res.status(200).json(listaPedidos);
});

router.get("/pedidos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const pedido = await Pedido.findByPk(id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ message: "Pedido não encontrado." })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

router.get("/pedidos/produtos/:id", async (req, res) => {
    try {
        const { produtoId } = req.params;

        const pedido = await Pedido.findByPk(produtoId);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ message: "Produto não encontrado." })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

router.get("/pedidos/clientes/:id", async (req, res) => {
    try {
        const { clienteId } = req.params;

        const pedido = await Pedido.findByPk(clienteId);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ message: "Cliente não encontrado." })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

module.exports = router;
