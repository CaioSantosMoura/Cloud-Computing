const user = require("../models/userModel");

const addUser = async (req) => {
   const name = req.body.name;
   if (!name || name.trim() === "") throw new Error("Nome está vazio!");

   return await (newUser = user.create({
      nome: name,
      data_criacao: new Date(),
   }));
};

const getUser = async (req) => {
   const name = req.params.name;
   if (!name || name.trim() === "") throw new Error("Nome está vazio!");

   return await user.findOne({
      where: { nome: name },
   });
};

const getAllUsers = async () => {
   return await user.findAll();
};

const deleteUser = async (req) => {
   const name = req.params.name;
   if (!name || name.trim() === "") throw new Error("Nome está vazio!");

   return await user.destroy({ where: { nome: name } });
};

const updateUser = async (req) => {
   const name = req.params.name;

   if (!name || name.trim() === "") throw new Error("Nome está vazio!");

   const alterUser = await user.findOne({ where: { nome: name } });

   const newName = req.body.name;
   alterUser.nome = newName;
   return await alterUser.save();
};

module.exports = {
   addUser,
   getUser,
   getAllUsers,
   deleteUser,
   updateUser,
};
