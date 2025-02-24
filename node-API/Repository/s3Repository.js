const s3 = require("../config/awsConfig.js");
const fs = require("fs");

class s3Repository {
   static uploadFile = (filePath, bucketName, keyName) => {
      const fileContent = fs.readFileSync(filePath);

      const params = {
         Bucket: bucketName, // Nome do seu bucket S3
         Key: keyName, // Nome do arquivo no S3
         Body: fileContent, // Conteúdo do arquivo
      };

      s3.upload(params, (err, data) => {
         if (err) {
            console.error("Erro ao fazer o upload:", err);
         } else {
            console.log("Arquivo carregado com sucesso:", data.Location);
         }
      });
   };

   static downloadFile = (bucketName, keyName, downloadPath) => {
      const params = {
         Bucket: bucketName,
         Key: keyName,
      };

      const file = fs.createWriteStream(downloadPath);

      s3.getObject(params).createReadStream().pipe(file);

      file.on("close", () => {
         console.log("Arquivo baixado com sucesso:", downloadPath);
      });
   };
}

module.exports = s3Repository;
