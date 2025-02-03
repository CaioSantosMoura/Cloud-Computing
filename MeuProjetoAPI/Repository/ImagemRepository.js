const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const app = express();
const PORT = 3000;
const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "mundo",
});

connection.connect();

class ImagemRepository {

   getAll(callback) {
       connection.query("SELECT * FROM imagem", (error, results) => {
           if (error) return callback(error, null);
           callback(null, results);
       });
   }

   getById(id, callback) {
       connection.query(
           "SELECT * FROM imagem WHERE id = ?",
           [id],
           (error, results) => {
               if (error) return callback(error, null);
               callback(null, results[0]);
           }
       );
   }

   create(imagem, callback) {
       const query = "INSERT INTO imagem (id, referencia, titulo, data_criacao) VALUES (?, ?, NOW())";
       const values = [imagem.id, imagem.referencia, imagem.titulo];
       connection.query(query, values, (error, results) => {
           if (error) return callback(error, null);
           callback(null, results);
       });
   }

   
   update(id, imagem, callback) {
      const query = "UPDATE imagem SET referencia = ?, data_criacao = ?, titulo = ? WHERE id = ?";
      const values = [imagem.referencia, imagem.data_criacao, imagem.titulo, id];
      connection.query(query, values, (error, results) => {
          if (error) return callback(error, null);
          callback(null, results);
      });
  }

  delete(id, callback) {
      const query = "DELETE FROM imagem WHERE id = ?";
      connection.query(query, [id], (error, results) => {
          if (error) return callback(error, null);
          callback(null, results);
      });
  }
}

module.exports = new ImagemRepository();