const express = require('express')
const path = require('path')
const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
});

const clienteController = require('./clienteController');

const loginController = require('./loginController');

const produtoController = require('./produtoController');

const pedidoController = require('./pedidoController');

router.get('/clientes', loginController.autenticarToken, clienteController.listaClientes);

router.get('/clientes/:cpf', loginController.autenticarToken, clienteController.buscarCliente);

router.post('/clientes', clienteController.adicionarCliente);

router.patch('/clientes/:cpf', clienteController.atualizarCliente);

router.delete('/clientes/:cpf', clienteController.deleterCliente);

router.post('/login', loginController.loginCliente)

router.get('/produto', produtoController.listaProduto)

router.get('/produto/:id_produto',produtoController.buscarProdutoID)

router.get('/produto/nome/:nome_produto', produtoController.buscaProduto)

router.post('/produto',loginController.autenticarToken,produtoController.adicionarProduto)

router.delete('/produto/:id_produto',loginController.autenticarToken,produtoController.deletarProduto)

router.use('/pedido',loginController.autenticarToken)

router.get('/pedido', pedidoController.buscarpedidoID)

router.get('/pedido/:id_pedido', pedidoController.buscarpedidoID)

router.get('/pedido/cliente/:id_cliente', pedidoController.buscarPedidoCliente)

router.post('/pedido',pedidoController.adicionarPedido)

router.patch('/pedido',pedidoController.atualizarPedido)

router.patch('/pedido',pedidoController.deletarPedido)

module.exports = router;