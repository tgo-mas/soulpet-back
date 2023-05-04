// Importações principais e variáveis de ambiente
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Cliente = require("./database/cliente");
const Produto = require("./database/produto");
const Servico = require("./database/servico");
const Endereco = require("./database/endereco");
const Pet = require("./database/pet");
const Pedido = require("./database/pedido");
const Agendamento = require("./database/agendamento");

// Configuração do App
const app = express();
app.use(express.json()); // Possibilitar transitar dados usando JSON
app.use(morgan("dev"));

// Configurações de acesso
app.use(cors({ origin: "http://localhost:3000" }));

// Configuração do Banco de Dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); // efetivar a conexão

// Definição de Rotas
const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets");
const rotasServicos = require("./routes/servicos");       //  criar doc de rotas para Servicos
const rotasPedidos = require("./routes/pedidos"); //  criar doc de rotas para Pedidos
const rotasProdutos = require("./routes/produtos"); //  criar doc de rotas para Produtos
const rotasAgendamentos = require("./routes/agendamentos");

// Juntar ao app as rotas dos arquivos
app.use(rotasClientes); // Configurar o grupo de rotas no app
app.use(rotasPets);
app.use(rotasServicos);  // criar doc de rotas para Servicos
app.use(rotasPedidos);  // criar doc de rotas para Pedidos 
app.use(rotasProdutos);  // criar doc de rotas para Produtos 
app.use(rotasAgendamentos);

const dbForce = process.env.DB_FORCE
if (dbForce == "true") {
  connection.sync({ force: true }).then(async () => {

    await Cliente.bulkCreate([
      { nome: 'Luiz Eduardo', email: 'luiz@email.com', telefone: '(11) 9999-9999', },
      { nome: 'Angel', email: 'angel@email.com', telefone: '(12) 9999-9999' },
      { nome: 'Gregory', email: 'gregory@email.com', telefone: '(21) 9999-9999' },
    ])
    await Endereco.bulkCreate([
      { rua: 'Rua 1', numero: '1374', cidade: 'Taubaté', estado: 'SP', uf: 'SP', cep: "123456789", clienteId: 1 },
      { rua: 'Rua 2', numero: '1523', cidade: 'São Paulo', estado: 'SP', uf: 'SP', cep: "123456789", clienteId: 2 },
      { rua: 'Avenida 3', numero: '634', cidade: 'Rio de Janeiro', estado: 'RJ', uf: 'SP', cep: "123456789", clienteId: 3 }
    ])
    await Produto.bulkCreate([
      { nome: 'Ração', preco: 120, descricao: 'Ração para gatos castrados', desconto: 10, dataDesconto: '2023-01-01', categoria: 'Alimentação' },
      { nome: 'Areia', preco: 30, descricao: 'Areia Higiênica', desconto: 5, dataDesconto: '2023-01-01', categoria: 'Higiene' },
      { nome: 'Shampoo', preco: 50, descricao: 'Shampoo para banho', desconto: 5, dataDesconto: '2023-01-01', categoria: 'Higiene' },

    ])
    await Pet.bulkCreate([
      { nome: 'Toby', tipo: 'Cão', porte: 'pequenho', dataNasc: '2006/01/01', idade: 17, clienteId: 2 },
      { nome: 'Luna', tipo: 'Gato', porte: 'medio', dataNasc: '2013/01/01', idade: 10, clienteId: 1 },
      { nome: 'Lilica', tipo: 'Cão', porte: 'pequenho', dataNasc: '2010/01/01', idade: 13, clienteId: 3 },
    ])
    await Pedido.bulkCreate([
      { quantidade: 1, clienteId: 1, produtoId: 1 },
      { quantidade: 2, clienteId: 2, produtoId: 2 },
      { quantidade: 5, clienteId: 3, produtoId: 3 },
    ])
    await Servico.bulkCreate([
      { nome: "tosa", preco: 50 },
      { nome: "banho", preco: 50 },
      { nome: "veterinario", preco: 150 },
    ])
    await Agendamento.bulkCreate([
      { dataAgendada: '2023/06/06', realizada: true, petId: 1, servicoId: 1 },
      { dataAgendada: '2023/06/06', realizada: false, petId: 2, servicoId: 2 },
      { dataAgendada: '2023/06/06', realizada: true, petId: 3, servicoId: 3 }
    ])

  }).catch((err) => {
    console.error('Erro ao sincronizar banco de dados', err)
  })
} else {
  connection.sync()
}

// Escuta de eventos (listen)
app.listen(3001, () => {
  // Gerar as tabelas a partir do model
  // Force = apaga tudo e recria as tabelas
  console.log("Servidor rodando em http://localhost:3001/");
});
