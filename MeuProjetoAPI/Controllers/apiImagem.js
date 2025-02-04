import express from 'express';
import mysql from 'mysql';
import axios from 'axios';
const app = express();
const PORT = 3000;
const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "mundo",
});
connection.connect();

const imagemController = {
   // PEGAR TODOS OS IMAGENS CADASTRADOS
   getImagem: async (req, res) => {
      connection.query("SELECT * FROM tb_imagens", (error, results) => {
         if (error) throw error;
         res.send(results);
      });
   },

   // PEGAR TODOS OS IMAGENS POR ID
   getById: async (req, res) => {
      const { id } = req.params;
      connection.query(
         `SELECT * FROM tb_imagens WHERE id = ${id}`,
         (error, results) => {
            if (error) throw error;
            res.send(results);
         }
      );
      app.use(express.json());
   },



   // POSTA AS INFORMAÇÕES DO IMAGEM
   create: async (req, res) => {
      const { id, referencia, data_criacao, titulo } = req.body;

      const query =
         "INSERT INTO tb_imagens (id, referencia, data_criacao, titulo) VALUES (?, ?, ?, ?)";
      const values = [id, referencia, data_criacao, titulo];
      connection.query(query, values, (error, results) => {
         if (error) {
            console.error("Erro ao inserir dados:", error);
            return res
               .status(500)
               .send({ error: "Erro ao inserir dados no banco" });
         }
         res.send({
            message: "Imagem inserido com sucesso!",
            results,
         });
      });
   },

   // DELETA O IMAGEM POR ID
   deleteImagemById: async (req, res) => {
      const { id } = req.params;

      const checkQuery = "SELECT * FROM tb_imagens WHERE id = ?";
      connection.query(checkQuery, [id], (error, results) => {
         if (error) {
            console.error("Erro ao verificar a imagem:", error);
            return res
               .status(500)
               .send({ error: "Erro ao verificar dados no banco" });
         }

         if (results.length === 0) {
            return res.status(404).send({ error: "Imagem não encontrada" });
         }

         const deleteQuery = "DELETE FROM tb_imagens WHERE id = ?";
         connection.query(deleteQuery, [id], (deleteError, deleteResults) => {
            if (deleteError) {
               console.error("Erro ao deletar dados:", deleteError);
               return res
                  .status(500)
                  .send({ error: "Erro ao deletar dados do banco" });
            }
            res.send({
               message: "Imagem deletado com sucesso!",
               deleteResults,
            });
         });
      });
   },

   // ATUALIZA O IMAGEM POR ID
   updateById: async (req, res) => {
      const { id } = req.params;
      const { referencia, data_criacao, titulo } = req.body;

      const checkQuery = "SELECT * FROM tb_imagens WHERE id = ?";
      connection.query(checkQuery, [id], (error, results) => {
         if (error) {
            console.error("Erro ao verificar a imagem:", error);
            return res
               .status(500)
               .send({ error: "Erro ao verificar dados no banco" });
         }

         if (results.length === 0) {
            return res.status(404).send({ error: "Imagem não encontrada" });
         }

         const updateQuery =
            "UPDATE tb_imagens SET referencia = ?, data_criacao = ?, titulo = ? WHERE id = ?";
         const values = [referencia, data_criacao, titulo, id];
         connection.query(updateQuery, values, (updateError, updateResults) => {
            if (updateError) {
               console.error("Erro ao atualizar dados:", updateError);
               return res
                  .status(500)
                  .send({ error: "Erro ao atualizar dados no banco" });
            }

            res.send({
               message: "Imagem atualizada com sucesso!",
               updateResults,
            });
         });
      });
   },
};

export default imagemController;

app.listen(PORT, () => {
   console.log(`Servidor rodando na porta: ${PORT}`);
});
