const db = require('./db');
const joi = require('joi');

const pedidoSchema = joi.object({
    forma_pgto: joi.string().required(),
    qtde_itens: joi.string().required(),
    valor_total: joi.string().required(),
    observacao: joi.string(),
    id_cliente: joi.string().required(),
    id_entregador: joi.string().required()
})

exports.listaPedido = (req, res) => {
    db.query('SELECT * FROM pedido', (err, result) => {
        if (err) {
            console.error('erro ao buscar pedido:', err);
            res.status(500).json({ error: 'erro interno do servidor' })
            return;
        };
        res.json(result)
    });
};

exports.buscarpedidoID = (req, res) => {
    const { id_pedido } = req.params;
    db.query('SELECT * FROM pedido WHERE id_pedido = ?', id_pedido, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
            return;
        }
        res.json(result[0]);
    });
};

exports.buscarPedidoCliente = (req, res) => {
    const { id_cliente } = req.params;
    db.query('SELECT * FROM pedido WHERE id_cliente = ?', id_cliente, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
            return;
        }
        res.json(result[0]);
    });
};

exports.adicionarPedido = (req, res) => {
    const { forma_pgto, qtde_itens, valor_total, observacao, id_cliente, id_entregador } = req.body;
    const { error } = pedidoSchema.validate({ forma_pgto, qtde_itens, valor_total, observacao, id_cliente, id_entregador })

    if (error) {
        res.status(400).json({ error: 'Dados de pedido inválidos' });
        return
    }
    const novoPedido = {
        forma_pgto,
        qtde_itens,
        valor_total,
        observacao,
        id_cliente,
        id_entregador
    }
    db.query('INSERT INTO pedido SET ?', novoPedido, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        };
        res.json({ message: 'pedido adicionado com sucesso' })
    })
}

exports.atualizarPedido = (req, res) => {
    const { id_pedido } = req.params;
    const { forma_pgto, qtde_itens, valor_total, observacao, id_cliente, id_entregador } = req.body;
    const { error } = pedidoschema.validate(forma_pgto, qtde_itens, valor_total, observacao, id_cliente, id_entregador)
    if (error) {
        res.status(400).json({ error: 'dados de pedido inválidos' })
    }

    const novoProduto = {
        forma_pgto,
        qtde_itens,
        valor_total,
        observacao,
        id_cliente,
        id_entregador
    }
    db.query('UPDATE produto SET ? WHERE id_pedido = ?', [novoProduto, id_pedido], (err, result) => {
        if (err) {
            console.error('erro ao atualizar pedido', err);
            res.status(500).json({ error: 'erro interno do servidor' })
            return;
        }
        res.json({ message: 'pedido atualizado com sucesso' })
    });
};

exports.deletarPedido = (req, res) => {
    const { id_pedido } = req.params;
    db.query('DELETE FROM pedido WHERE id_produto = ?', id_pedido, (err, result) => {
        if (err) {
            console.error('erro ao deletar produto', err)
            res.status(500).json
            return;
        };
        res.json({ message: 'pedido deletado com sucesso' })
    });
};