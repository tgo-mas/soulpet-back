const Agendamento = require("../database/agendamento");
const { Router } = require("express");

const router = Router();

router.get("/agendamentos", async (req, res) => {
  const listaAgendamentos = await Agendamento.findAll();
  res.status(200).json(listaAgendamentos);
});

router.get("/agendamentos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const agendamento = await Agendamento.findByPk(id);
    if (agendamento) {
      res.status(200).json(agendamento);
    } else {
      res.status(404).json({ message: "Agendamento não encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

router.post("/agendamentos", async (req, res) => {
  try {
    const { data, horario, descricao } = req.body;
    const agendamento = await Agendamento.create({ data, horario, descricao });
    res.status(201).json(agendamento);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

router.put("/agendamentos/:id", async (req, res) => {
  const { data, horario, descricao } = req.body;
  const { id } = req.params;
  const agendamento = await Agendamento.findByPk(id);

  try {
    if (agendamento) {
      await Agendamento.update(
        { data, horario, descricao },
        { where: { id } }
      );
      res.json({ message: "O agendamento foi atualizado." });
    } else {
      res.status(404).json({ message: "O agendamento não foi encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

router.delete("/agendamentos/:id", async (req, res) => {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id);
    if (agendamento) {
      await agendamento.destroy();
      res.json({ message: "O agendamento foi removido." });
    } else {
      res.status(404).json({ message: "O agendamento não foi encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

module.exports = router;
