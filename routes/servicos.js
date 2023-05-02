const Servico = require("../database/servico");
const Agendamento = require("../database/agendamento");

const { Router } = require("express");

// Criar o grupo de rotas (/servicos)
const router = Router();

// Definição de rotas
router.get("/servicos", async (req, res) => {

    const { nome, dataAgendada, realizada } = req.query;
    try {
        if (!nome && !dataAgendada && !realizada) {
            const response = await Servico.findAll();
            res.status(200).json(response);
        } else {
            const query = {};
            if (nome) {
                query.nome = { $regex: nome, $options: 'i' };
            }
            if (dataAgendada) {
                query.dataAgendada = dataAgendada;
            }
            if (realizada) {
                query.realizada = realizada;
            }
            const response = await Servico.find().or([query]);
            res.status(200).json(response)
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// busca servicos por id
router.get("/servicos/:id", async (req, res) => {
    // SELECT * FROM servicos WHERE id = 3;
    const servico = await Servico.findOne({
        where: { id: req.params.id },
    });

    if (servico) {
        res.json(servico);
    } else {
        res
            .status(404)
            .json({ message: "O servico que você busca não encontrado." });
    }
});

// Rota POST serviços
router.post("/servicos", async (req, res) => {

    const { nome, preco } = req.body;

    try {
        if (!nome || !preco) {
            res.status(422).json({ message: "Campo da requisição vazio." })
        }

        const servico = await Servico.create({ nome, preco });
        res.json(servico);
    } catch (err) {
        res.status(500).json(err);
    }

});

router.put("/servicos/:id", async (req, res) => {

    const { nome, preco } = req.body;

    const servico = Servico.findByPk(req.params.id);

    try{

        if(servico){
            Servico.update({ nome, preco }, { where: { id: req.params.id }});
            res.json("Serviço editado com sucesso!");
        }else{
            res.status(404).json({message: "Serviço não encontrado."})
        }

    }catch(err){
        console.log(err);
        res.status(500).json(`Um erro aconteceu: ${err.message}`);
    }

});

router.delete("/servicos/:id", async (req, res) => {

    const servico = await Servico.findByPk(req.params.id);

    try{

        if(servico){
            await servico.destroy();
            res.json({message: "Serviço excluido com sucesso!"});
        }else{
            res.status(404).json({message: "Serviço não encontrado!"});
        }

    }catch(err){

        console.log(err);
        res.status(500).json({message: "Um erro aconteceu."});

    }
});

module.exports = router;

//     const listaServicos = await Servico.findAll();
//     res.json(listaServicos);
//   });

