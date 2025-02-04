const Sequelize = require("sequelize");
const database = require("../Repository/database");

const imagens = database.define(
   "tb_imagens",
   {
      id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true,
      },
      referencia: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      data_criacao: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      titulo: {
         type: Sequelize.STRING,
         allowNull: false,
      },
   },
   {
      timestamps: false,
   }
);

module.exports = imagens;