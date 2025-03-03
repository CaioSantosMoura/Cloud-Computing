const usuario = require("../model/usuarioModel");
const usuarioService = require("../service/usuarioService");

const addUsuario = async (req, res) => {
   try {
      const usuario = await usuarioService.addUsuario(req);

      res.status(200).json({
         message: "Usuário criado com sucesso!",
         usuario,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado: " + error.message,
      });
   }
};

const getUsuario = async (req, res) => {
   try {
      const findUsuario = await usuarioService.getUsuario(req);

      if (findUsuario) {
         res.status(200).json({
            findUsuario,
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

const getAllUsuarios = async (req, res) => {
   try {
      const findAllUsuarios = await usuario.findAll();

      if (findAllUsuarios) {
         res.status(200).json({
            usuarios: findAllUsuarios,
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

const deleteUsuario = async (req, res) => {
   try {
      const deleted = await usuarioService.deleteUsuario(req);

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

const updateUsuario = async (req, res) => {
   try {
      const alterarUsuario = await usuarioService.updateUsuario(req);

      if (alterarUsuario) {
         res.status(200).json({
            message: "Usuário modificado com sucesso!",
            alterarUsuario,
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
   addUsuario,
   getUsuario,
   getAllUsuarios,
   deleteUsuario,
   updateUsuario,
};
