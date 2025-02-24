const image = require("../models/imageModel");

const addImage = async (req, ref) => {
   const ref = req.body.reference;
   const title = req.body.title;

   if (!title || title.trim() === "") throw new Error("Titulo está vazio!");
   if (!ref || ref.trim() === "") throw new Error("Referência está vazia!");

   return await image.create({
      referencia: ref,
      data_criacao: new Date(),
      titulo: title,
   });
};

const getImage = async (req) => {
   const title = req.params.title;
   if (!title || title.trim() === "") throw new Error("Titulo está vazio!");

   return await image.findOne({ where: { titulo: title } });
};

const getAllImages = async () => {
   return await image.findAll();
};

const deleteImage = async (req) => {
   const title = req.params.title;
   if (!title || title.trim() === "") throw new Error("Titulo está vazio!");

   return await image.destroy({ where: { titulo: title } });
};

const updateImage = async (req) => {
   const title = req.params.title;
   const imageFinded = await image.findOne({ where: { titulo: title } });

   if (!imageFinded) throw new Error("Imagem não encontrada!");

   const newTitle = req.body.title;
   const newReference = req.body.reference;

   if (newTitle != null) {
      imageFinded.titulo = newTitle;
   }
   if (newReference != null) {
      imageFinded.referencia = newReference;
   }

   return await imageFinded.save();
};

module.exports = {
   addImage,
   getImage,
   getAllImages,
   deleteImage,
   updateImage,
};
