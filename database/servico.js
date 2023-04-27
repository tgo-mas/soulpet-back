// funcoes model e schema do mongoose
const { model, Schema} = require("mongoose");

// documento(tabela task) e propriedades do documento(titulo, descricao, status)
const Servico = model(
    "servico",                     // nome do modelo(base p/colecao)
    new Schema({                // validacao do documento
        nome: {
            type: String,       // String, Number, boolean
            required: true,
        },
        preco: {
            type: Boolean,
            required: true,
        }
    }) 
    ); 


    module.exports = Servico;