const {connection} = require("../database/database");
const {DataTypes} = require("sequelize");

// documento(tabela task) e propriedades do documento(titulo, descricao, status)
const Servico = connection.define(
    "servico",                     
    {               
        nome: {
            type: DataTypes.STRING,       // String, Number, boolean
            allowNull: false,
        },
        preco: {
            type: DataTypes.NUMBER,
            allowNull: false,
        }
    }
); 

module.exports = Servico;
