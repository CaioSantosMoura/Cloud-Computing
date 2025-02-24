const imagem = require("../Model/imagemModel");

const addImagem = async (req) => {
   const ref = req.body.reference;
   const title = req.body.title;

   if (!title || title.trim() === "") throw new Error("Titulo está vazio!");
   if (!ref || ref.trim() === "") throw new Error("Referência está vazia!");

   return await imagem.create({
      referencia: ref,
      data_criacao: new Date(),
      titulo: title,
   });
};

const getImagem = async (req) => {
   const title = req.params.title;
   if (!title || title.trim() === "") throw new Error("Titulo está vazio!");

   return await imagem.findOne({ where: { titulo: title } });
};

const getAllImagems = async () => {
   return await imagem.findAll();
};

const deleteImagem = async (req) => {
   const title = req.params.title;
   if (!title || title.trim() === "") throw new Error("Titulo está vazio!");

   return await imagem.destroy({ where: { titulo: title } });
};

const updateImagem = async (req) => {
   const title = req.params.title;
   const imagemFinded = await imagem.findOne({ where: { titulo: title } });

   if (!imagemFinded) throw new Error("imagemm não encontrada!");

   const newTitle = req.body.title;
   const newReference = req.body.reference;

   if (newTitle != null) {
      imagemFinded.titulo = newTitle;
   }
   if (newReference != null) {
      imagemFinded.referencia = newReference;
   }

   return await imagemFinded.save();
};

module.exports = {
   addImagem,
   getImagem,
   getAllImagems,
   deleteImagem,
   updateImagem,
};
