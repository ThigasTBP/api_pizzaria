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

const itemController = require('./itemController');

router.get('/clientes', loginController.autenticarToken, clienteController.listaClientes);

router.get('/clientes/:cpf', loginController.autenticarToken, clienteController.buscarCliente);

router.post('/clientes', clienteController.adicionarCliente);

router.patch('/clientes/:cpf', clienteController.atualizarCliente);

router.delete('/clientes/:cpf', clienteController.deleterCliente);

router.post('/login', loginController.loginCliente)

router.get('/produto', produtoController.listaProduto)

router.get('/produto/:id_produto',produtoController.buscarProdutoID)

router.get('/produto/nome/:nome_produto', produtoController.buscarProdutoNome)

router.patch('/produto/:id_produto',produtoController.atualizarProduto)

router.post('/produto',produtoController.adicionarProduto)

router.delete('/produto/:id_produto',produtoController.deletarProduto)

// router.use('/pedido',loginController.autenticarToken)

router.get('/pedido', pedidoController.listaPedido)

router.get('/pedido/:id_pedido', pedidoController.buscarpedidoID)

router.get('/pedido/cliente/:id_cliente', pedidoController.buscarPedidoCliente)

router.post('/pedido',pedidoController.adicionarPedido)

router.patch('/pedido/id_pedido',pedidoController.atualizarPedido)

router.delete('/pedido',pedidoController.deletarPedido)

router.use('/item',loginController.autenticarToken)

router.get('/item',itemController.listaItemPedido)

router.get('/item/:id_item',itemController.buscarItem)

router.get('/item/pedido/:id_pedido',itemController.buscarItemPedido)

router.get('/item/produto/:id_produto',itemController.buscarItemProduto)

router.post('/item',itemController.adicionarItem_Pedido)

router.patch('/item',itemController.Atualizaritem_Pedido)

router.delete('/item',itemController.deletarItem)

module.exports = router;