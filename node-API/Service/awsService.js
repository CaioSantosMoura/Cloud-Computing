const { v4: uuidv4 } = require("uuid");
const repository = require("../repository/s3Repository");
const imageService = require("./imageService");

const uploadImage = async (filePath, bucketName) => {
   keyName = uuidv4();

   try {
      const data = await repository.uploadFile(filePath, bucketName, keyName);
      await imageService.addImage(filePath, keyName);
      return { success: true, location: data.Location };
   } catch (err) {
      throw new Error("Erro ao fazer upload: " + err.message);
   }
};

const downloadImage = async (filePath, bucketName, keyName) => {
   try {
      const path = await repository.downloadFile(filePath, bucketName, keyName);
      return { success: true, path };
   } catch (err) {
      throw new Error("Erro ao fazer download: " + err.message);
   }
};

module.exports = {
   uploadImage,
   downloadImage,
};
