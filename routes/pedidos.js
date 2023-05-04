const Cliente = require("../database/cliente");
const Pedido = require("../database/pedido");
const Produto = require("../database/produto");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

router.get("/pedidos", async (req, res) => {
  const listaPedidos = await Pedido.findAll();
  res.status(200).json(listaPedidos);
});

router.get("/pedidos/:codigo", async (req, res) => {
  try {
    const { codigo } = req.params;

    const pedido = await Pedido.findByPk(codigo);
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

router.post("/pedidos", async (req, res) => {
  try {
    const { codigo, quantidade, clienteId, produtoId } = req.body;

    const cliente = await Cliente.findByPk(clienteId);
    const produto = await Produto.findByPk(produtoId);

    if (cliente && produto) {
      const pedido = await Pedido.create({ codigo, quantidade, clienteId, produtoId });
      res.status(201).json(pedido)
    } else if (!cliente) {
      res.status(404).json({ message: "Cliente não encontrado." });
    } else if (!produto) {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." })
  }
})

router.put("/pedidos/:codigo", async (req, res) => {
  const { quantidade, clienteId, produtoId } = req.body;
  const { codigo } = req.params;

  const pedido = await Pedido.findByPk(req.params.codigo);

  try {
    if (pedido) {
      await Pedido.update(
        { quantidade, clienteId, produtoId },
        { where: { codigo } }
      );
      res.json({ message: "O pedido foi editado." });
    } else {
      res.status(404).json({ message: "O pedido não foi encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

router.delete('/pedidos/:codigo', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.codigo);
    if (!pedido) {
      return res.status(404).send();
    }
    res.send(pedido);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/pedidos/clientes/:id', async (req, res) => {
  try {
    const pedidos = await Pedido.deleteMany({ clienteId: req.params.id });
    if (pedidos.deletedCount === 0) {
      return res.status(404).send();
    }
    res.send(pedidos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/pedidos/produtos/:id', async (req, res) => {
  try {
    const pedidos = await Pedido.deleteMany({ produtoId: req.params.id });
    if (pedidos.deletedCount === 0) {
      return res.status(404).send();
    }
    res.send(pedidos);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;



