const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIA5RRHCKYZTUINUDUY',
    secretAccessKey: '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'
});

const s3 = new AWS.S3();
const path = require('path');

const mysql = require("mysql2");

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 's3'
});

const uploadFile = async (filePath, bucketName, keyName) => {
    try {
        if (!filePath) {
            throw new Error("Caminho do arquivo não pode ser undefined.");
        }

        console.log("Iniciando upload do arquivo:", filePath);

        const fileContent = fs.readFileSync(filePath);
        const params = { Bucket: bucketName, Key: keyName, Body: fileContent };

        const data = await s3.upload(params).promise();

        console.log("Resposta do upload S3:", data);

        if (!data || !data.Location) {
            throw new Error("Falha no upload para o S3.");
        }

        const fileExtension = path.extname(filePath).toLowerCase();
        if (!fileExtension) {
            throw new Error("Tipo de arquivo não detectado.");
        }

        console.log("Upload bem-sucedido. Tipo de imagem:", fileExtension);

        const dataCriacao = new Date();
        const nomeImagem = path.basename(filePath);

        const query = `INSERT INTO tb_imagens (referencia, data_criacao, titulo) VALUES (?, ?, ?)`;

        dbConnection.execute(query, [data.Location, dataCriacao, nomeImagem], (err, results) => {
            if (err) {
                console.error("Erro ao inserir no banco:", err.message);
                throw err;
            }
            console.log("Imagem inserida no banco com sucesso:", results);
        });

        return { location: data.Location, fileExtension };
    } catch (error) {
        console.error("Erro no upload:", error.message);
        throw error;
    }
};

const downloadFile = async (bucketName, keyName, downloadPath) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: keyName,
        };

        const data = await s3.getObject(params).promise();

        fs.writeFileSync(downloadPath, data.Body);
        return downloadPath;
    } catch (error) {
        throw new Error("Erro no download: " + error.message);
    }
};

module.exports = { uploadFile, downloadFile };

