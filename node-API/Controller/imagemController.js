const imagem = require("../Model/imagemModel");
const imagemService = require("../Service/imagemService");

const addImagem = async (req, res) => {
   try {
      const imagem = await imagemService.addImagem(req);

      res.status(200).json({
         message: "imagemm adicionada com sucesso!",
         imagem,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
};

const getImagem = async (req, res) => {
   try {
      const findImagem = await imagemService.findImagem(req);

      if (findImagem) {
         res.status(200).json({
            imagem: findImagem,
         });
      } else {
         res.status(404).json({
            message: "Imagem not found!",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
};

const getAllImagems = async (req, res) => {
   try {
      const findAllImagems = await imagemService.getAllImagems();

      if (findAllImagems && findAllImagems.length > 0) {
         res.status(200).json({
            imagem: findAllImagems,
         });
      } else {
         res.status(404).json({
            message: "Nenhuma Imagem encontrada!",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
};

const deleteImagem = async (req, res) => {
   try {
      const deleted = await imagemService.deleteImagem(req);

      if (deleted) {
         res.status(200).json({
            message: "Imagem deletada com sucesso!",
         });
      } else {
         res.status(404).json({
            message: "Imagem não encontrado",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
};

const updateImagem = async (req, res) => {
   try {
      const alterarImagem = await imagemService.updateImagem(req);

      if (alterarImagem) {
         res.status(200).json({
            message: "Imagem modificada com sucesso!",
         });
      } else {
         res.status(404).json({
            message: "Imagem não encontrado",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
};

module.exports = {
   addImagem,
   getImagem,
   getAllImagems,
   deleteImagem,
   updateImagem,
};
