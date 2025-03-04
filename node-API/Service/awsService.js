const repository = require("../Repository/s3Repository");
const AWS = require("aws-sdk");
const fs = require("fs");
const s3 = new AWS.S3();
const path = require('path');

const uploadFile = async (filePath, bucketName, keyName) => {
   try {
      console.log("Chamando uploadFile...");
      const data = await repository.uploadFile(filePath, bucketName, keyName);

      if (!data || !data.location) {
         throw new Error("Retorno inválido do upload S3.");
      }

      console.log("Upload bem-sucedido, salvando no imageService...");

      return { success: true, location: data.Location };
   } catch (err) {
      console.error("Erro ao fazer upload:", err);
      throw new Error("Erro ao fazer upload: " + err.message);
   }
};

const downloadFile = async (bucketName, keyName, downloadPath) => {
   try {
      if (!bucketName || !keyName || !downloadPath) {
         throw new Error("Parâmetros internos ausentes");
      }

      const params = { Bucket: bucketName, Key: keyName };
      const data = await s3.getObject(params).promise();

      fs.mkdirSync(path.dirname(downloadPath), { recursive: true });
      fs.writeFileSync(downloadPath, data.Body);

      return downloadPath;
   } catch (error) {
      throw new Error("Falha no download: " + error.message);
   }
};

module.exports = {
   uploadFile,
   downloadFile,
};
