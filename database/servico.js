const {connection} = require("../database/database");
const {DataTypes, NUMBER} = require("sequelize");

// documento(tabela task) e propriedades do documento(titulo, descricao, status)
const Servico = connection.define(
    "servico",                     
    {               
        nome: {
            type: DataTypes.STRING,       // String, Number, boolean
            allowNull: true,
        },
        preco: {
            type: DataTypes.NUMBER,
            allowNull: true,
        }
    } 
    ); 


    module.exports = Servico;