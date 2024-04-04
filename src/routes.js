const express = require('express')
const path = require('path')
const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
});

const clienteController = require('./clienteController');

const loginController = require('./loginController')

const produtoController = require('./produtoController')

router.get('/clientes', loginController.autenticarToken, clienteController.listaClientes);

router.get('/clientes/:cpf', loginController.autenticarToken, clienteController.buscarCliente);

router.post('/clientes', clienteController.adicionarCliente);

router.patch('/clientes/:cpf', clienteController.atualizarCliente);

router.delete('/clientes/:cpf', clienteController.deleterCliente);

router.post('/login', loginController.loginCliente)

router.get('/produtos', produtoController.listaProdutos)

module.exports = router;