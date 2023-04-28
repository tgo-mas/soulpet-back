const {connection} = require("../database/database");
const {DataTypes} = require("sequelize");

const Servico = connection.define(
    "servico",                     
    {               
        nome: {
            type: DataTypes.STRING,       // String, Number, boolean
            allowNull: false,
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    }
); 

module.exports = Servico;
