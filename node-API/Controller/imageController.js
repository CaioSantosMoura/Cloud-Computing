const image = require("../models/imageModel");
const imageService = require("../service/imageService");

const addImage = async (req, res) => {
   try {
      const image = await imageService.addImage(req);

      res.status(200).json({
         message: "Imagem adicionada com sucesso!",
         image,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
};

const getImage = async (req, res) => {
   try {
      const findImage = await imageService.findImage(req);

      if (findImage) {
         res.status(200).json({
            image: findImage,
         });
      } else {
         res.status(404).json({
            message: "Image not found!",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
};

const getAllImages = async (req, res) => {
   try {
      const findAllImages = await imageService.getAllImages();

      if (findAllImages && findAllImages.length > 0) {
         res.status(200).json({
            images: findAllImages,
         });
      } else {
         res.status(404).json({
            message: "Nenhuma imagem encontrada!",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
};

const deleteImage = async (req, res) => {
   try {
      const deleted = await imageService.deleteImage(req);

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

const updateImage = async (req, res) => {
   try {
      const alterImage = await imageService.updateImage(req);

      if (alterImage) {
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
   addImage,
   getImage,
   getAllImages,
   deleteImage,
   updateImage,
};
