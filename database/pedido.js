const { connection } = require("../database/database");
const { DataTypes } = require("sequelize");
const Cliente = require("./cliente");
const Produto = require("./produto");

// documento(tabela task) e propriedades do documento(titulo, descricao, status)
const Pedido = connection.define(
    "pedido",
    {
        codigo: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
);

Cliente.hasMany(Pedido, { onDelete: "CASCADE" });
Pedido.belongsTo(Cliente);

Produto.hasMany(Pedido, { onDelete: "CASCADE" });
Pedido.belongsTo(Produto);

module.exports = Pedido;