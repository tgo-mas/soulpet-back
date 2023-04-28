const {connection} = require("../database/database");
const {DataTypes} = require("sequelize");
const Servico = require("./servico");
const Pet = require("./pet");


const Agendamento = connection.define(
    "agendamento",                     
    {               
        dataAgendada: {
            type: DataTypes.DATE,       
            allowNull: false,
        },
        realizada: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }
); 

// Relacionamento N:N
Servico.belongsToMany(Pet, {through:'Agendamento'});
Pet.belongsToMany(Servico,{through:'Agendamento'});


module.exports = Agendamento;