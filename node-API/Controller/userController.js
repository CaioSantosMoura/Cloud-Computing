const user = require("../models/userModel");
const userService = require("../service/userService");

const addUser = async (req, res) => {
   try {
      const user = await userService.addUser(req);

      res.status(200).json({
         message: "Usuário criado com sucesso!",
         user,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado: " + error.message,
      });
   }
};

const getUser = async (req, res) => {
   try {
      const findUser = await userService.getUser(req);

      if (findUser) {
         res.status(200).json({
            findUser,
         });
      } else {
         res.status(404).json({
            message: "Usuário não encontrado!",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado: " + error.message,
      });
   }
};

const getAllUsers = async (req, res) => {
   try {
      const findAllUsers = await user.findAll();

      if (findAllUsers) {
         res.status(200).json({
            users: findAllUsers,
         });
      } else {
         res.status(404).json({
            message: "Usuários está vazio!",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado: " + error.message,
      });
   }
};

const deleteUser = async (req, res) => {
   try {
      const deleted = await userService.deleteUser(req);

      if (deleted) {
         res.status(200).json({
            message: "Usuário deletado com sucesso!",
         });
      } else {
         res.status(404).json({
            message: "Usuário não encontrado",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado: " + error.message,
      });
   }
};

const updateUser = async (req, res) => {
   try {
      const alterUser = await userService.updateUser(req);

      if (alterUser) {
         res.status(200).json({
            message: "Usuário modificado com sucesso!",
            alterUser,
         });
      } else {
         res.status(404).json({
            message: "Usuário não encontrado",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado: " + error.message,
      });
   }
};

module.exports = {
   addUser,
   getUser,
   getAllUsers,
   deleteUser,
   updateUser,
};
