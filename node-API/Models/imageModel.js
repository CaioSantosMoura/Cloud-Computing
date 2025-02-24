const Sequelize = require("sequelize");
const database = require("../repository/database");

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
         type: Sequelize.DATE,
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
