const repository = require("../Repository/s3Repository");
const imagemService = require("./imagemService");

const uploadFile = async (filePath, bucketName, keyName) => {
   try {
      console.log("Chamando uploadFile...");
      const data = await repository.uploadFile(filePath, bucketName, keyName);

      if (!data || !data.location) {
         throw new Error("Retorno inválido do upload S3.");
      }

      console.log("Upload bem-sucedido, salvando no imageService...");
      // await imagemService.addImagem(filePath, keyName);

      return { success: true, location: data.Location };
   } catch (err) {
      console.error("Erro ao fazer upload:", err);
      throw new Error("Erro ao fazer upload: " + err.message);
   }
};


const downloadFile = async (bucketName, keyName, filePath) => {
   try {
      const path = await repository.downloadFile(bucketName, keyName, filePath);
      return { success: true, path };
   } catch (err) {
      console.error("Erro ao fazer download:", err.message);
      throw new Error("Erro ao fazer download: " + err.message);
   }
};

module.exports = {
   uploadFile,
   downloadFile,
};
