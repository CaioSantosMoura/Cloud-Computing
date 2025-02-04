import express from 'express';
import mysql from 'mysql';
import axios from 'axios';
const app = express();
const PORT = 3000;
const connection = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "mundo" });
connection.connect();

const usuarioController = {
    // PEGAR TODOS OS USUARIOS CADASTRADOS
    getUser: async (req, res) => {
        connection.query("SELECT * FROM tb_usuarios", (error, results) => {
            if (error) throw error;
            res.send(results);
        });
    },

    // PEGAR TODOS OS USUARIOS POR ID
    getById: async (req, res) => {
        const { id } = req.params;
        connection.query(`SELECT * FROM tb_usuarios WHERE id = ${id}`, (error, results) => {
            if (error) throw error;
            res.send(results);
        });
        app.use(express.json());
    },

    // POSTA AS INFORMAÇÕES DO USUARIO
    create: (req, res) => {
        const { id, nome, data_criacao } = req.body;

        // Validação dos campos obrigatórios
        if (!id || !nome || !data_criacao) {
            return res.status(400).send({
                error: "Campos obrigatórios faltando: id, nome, data_criacao"
            });
        }

        // Query com prepared statements
        const query = "INSERT INTO tb_usuarios (id, nome, data_criacao) VALUES (?, ?, ?)";
        const values = [id, nome, data_criacao];

        connection.query(query, values, (error, results) => {
            if (error) {
                console.error("Erro no MySQL:", error.sqlMessage);
                return res.status(500).send({
                    error: "Erro ao criar usuário",
                    details: error.sqlMessage
                });
            }

            res.status(201).send({
                success: true,
                message: "Usuário criado com sucesso",
                insertedId: id,
                data: { id, nome, data_criacao }
            });
        });
    },

    // DELETA O USUARIO POR ID
    deleteUserById: async (req, res) => {
        const { id } = req.params;

        const checkQuery = "SELECT * FROM tb_usuarios WHERE id = ?";
        connection.query(checkQuery, [id], (error, results) => {
            if (error) {
                console.error("Erro ao verificar usuário:", error);
                return res.status(500).send({ error: "Erro ao verificar dados no banco" });
            }

            if (results.length === 0) {
                return res.status(404).send({ error: "Usuário não encontrado" });
            }

            const updateQuery = "UPDATE tb_usuarios SET nome = ?, data_criacao = ? WHERE id = ?";
            const values = [nome, data_criacao, id];

            connection.query(`DELETE FROM tb_usuarios WHERE id = ${id}`, (error, results) => {
                if (error) {
                    console.error("Erro ao deletar dados:", error);
                    return res.status(500).send({ error: "Erro ao deletar dados do banco" });
                }
                res.send({
                    message: "Usuário deletado com sucesso!", results
                });
            });
        });
    },

    // ATUALIZA O USUARIO POR ID
    updateById: async (req, res) => {
        const { id } = req.params;
        const { nome, data_criacao } = req.body;

        const checkQuery = "SELECT * FROM tb_usuarios WHERE id = ?";
        connection.query(checkQuery, [id], (error, results) => {
            if (error) {
                console.error("Erro ao verificar usuário:", error);
                return res.status(500).send({ error: "Erro ao verificar dados no banco" });
            }

            if (results.length === 0) {
                return res.status(404).send({ error: "Usuário não encontrado" });
            }

            const updateQuery = "UPDATE tb_usuarios SET nome = ?, data_criacao = ? WHERE id = ?";
            const values = [nome, data_criacao, id];
            connection.query(updateQuery, values, (updateError, updateResults) => {
                if (updateError) {
                    console.error("Erro ao atualizar dados:", updateError);
                    return res.status(500).send({ error: "Erro ao atualizar dados no banco" });
                }

                res.send({
                    message: "Usuário atualizado com sucesso!", updateResults
                });
            });
        });
    }
};

export default usuarioController;

app.listen(PORT, () => {
    console.log(`Porta: ${PORT}`);
});