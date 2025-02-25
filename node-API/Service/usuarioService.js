const usuario = require("../Model/usuarioModel");

const addUsuario = async (req) => {
   const name = req.body.name;
   if (!name || name.trim() === "") throw new Error("Nome está vazio!");

   return await usuario.create({
      nome: name,
      data_criacao: new Date(),
   });   
};

const getUsuario = async (req) => {
   const name = req.params.name;
   if (!name || name.trim() === "") throw new Error("Nome está vazio!");

   return await usuario.findOne({
      where: { nome: name },
   });
};

const getAllUsuarios = async () => {
   return await usuario.findAll();
};

const deleteUsuario = async (req) => {
   const name = req.params.name;
   if (!name || name.trim() === "") throw new Error("Nome está vazio!");

   return await usuario.destroy({ where: { nome: name } });
};

const updateUsuario = async (req) => {
   const name = req.params.name;

   if (!name || name.trim() === "") throw new Error("Nome está vazio!");

   const alterusuario = await usuario.findOne({ where: { nome: name } });

   const newName = req.body.name;
   alterusuario.nome = newName;
   return await alterusuario.save();
};

module.exports = {
   addUsuario,
   getUsuario,
   getAllUsuarios,
   deleteUsuario,
   updateUsuario,
};
