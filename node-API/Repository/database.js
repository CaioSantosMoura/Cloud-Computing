const Sequelize = require("sequelize");

const compSequelize = new Sequelize("dbdesafioiago", "root", "", {
   dialect: "mysql",
   host: "localhost",
});

module.exports = compSequelize;
