const {DataTypes} = require("sequelize");
const {connection} = require("./database");

const Produto = connection.define("produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    preço: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },

    descricao: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },

    desconto: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },

    dataDesconto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports= Produto;
