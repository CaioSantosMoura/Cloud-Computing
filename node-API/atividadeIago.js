const express = require("express");
const axios = require("axios");

const app = new express();

const PORT = 3005;

app.get("/hello", async (req, res) => {
   try {
      res.status(200).json({
         message: "Olá Mundo!",
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/greet/:name", (req, res) => {
   const name = req.params.name;

   try {
      res.status(200).json({
         message: `Olá ${name}!`,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/sum/:num1/:num2", (req, res) => {
   const num1 = parseInt(req.params.num1);
   const num2 = parseInt(req.params.num2);

   try {
      res.status(200).json({
         result: `${num1 + num2}`,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/sub/:num1/:num2", (req, res) => {
   const num1 = parseInt(req.params.num1);
   const num2 = parseInt(req.params.num2);

   try {
      res.status(200).json({
         result: `${num1 - num2}`,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/multiply/:num1/:num2", (req, res) => {
   const num1 = parseInt(req.params.num1);
   const num2 = parseInt(req.params.num2);

   try {
      res.status(200).json({
         result: `${num1 * num2}`,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/divide/:num1/:num2", (req, res) => {
   const num1 = parseInt(req.params.num1);
   const num2 = parseInt(req.params.num2);

   try {
      res.status(200).json({
         result: `${num1 / num2}`,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/check-parity/:number", (req, res) => {
   const num = parseInt(req.params.number);

   try {
      if (num % 2 == 0) {
         res.status(200).json({
            parity: "par",
         });
      } else {
         res.status(200).json({
            parity: "impar",
         });
      }
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/full-name/:firstName/:lastName", (req, res) => {
   const firstName = req.params.firstName;
   const lastName = req.params.lastName;

   try {
      res.status(500).json({
         full_name: `${firstName} ${lastName}`,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/convert-temperature/:temp", (req, res) => {
   const temp = parseFloat(req.params.temp);

   try {
      res.status(200).json({
         fahrenheit: `${temp * (9 / 5) + 32}`,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.get("/calculate-age/:birth_year", (req, res) => {
   const birthYear = parseInt(req.params.birth_year);
   const currentYear = parseInt(new Date().getFullYear());

   try {
      res.status(200).json({
         age: `${currentYear - birthYear}`,
      });
   } catch (error) {
      res.status(500).json({
         error: "Erro inesperado",
      });
   }
});

app.listen(PORT, () => {
   console.log(`Online na porta: ${PORT}`);
});
app.use(express.json());
