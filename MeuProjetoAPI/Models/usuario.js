const Sequelize = require("sequelize");
const database = require("../Repository/database");

const usuarios = database.define(
   "tb_usuarios",
   {
      id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true,
      },
      nome: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      data_criacao: {
         type: Sequelize.STRING,
         allowNull: false,
      },
   },
   {
      timestamps: false,
   }
);

module.exports = usuarios;