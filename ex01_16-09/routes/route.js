//@ Importa as bibliotecas e arquivos
const express = require("express");
const routerApp = express.Router();
const appCalc = require("../controller/calculadora");

//@ Configura as rotas
routerApp.post("/calculadora", appCalc.fCalculo);

//@ Exporta a variável com as rotas
module.exports = routerApp;