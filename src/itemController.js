const db = require('./db');

exports.listaItemPedido = (req, res) => {
    db.query('SELECT * FROM item_pedido', (err, result) => {
        if (err) {
            console.error('erro ao buscar pedido', err);
            res.status(500).json({ error: 'erro interno do servidor' })
            return;
        }
        res.json(result)
    });
};

exports.buscarItemPedido = (req, res) => {
    const { id_pedido } = req.params;
    db.query('SELECT * FROM item_pedido WHERE id_pedido = ?', id_pedido, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' })
            return;
        }
        res.json(result[0])
    })
}

exports.buscarItem = (req, res) => {
    const { id_item } = req.params;
    db.query('SELECT * FROM item_pedido WHERE id_item = ?', id_item, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' })
            return;
        }
        res.json(result[0])
    })
}

exports.buscarItemProduto = (req, res) => {
    const { id_produto } = req.params;
    db.query('SELECT * FROM item_pedido WHERE id_produto = ?', id_produto, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' })
            return;
        }
        res.json(result[0])
    })
}

exports.adicionarItem_Pedido = (req, res) => {
    const { qtde, valor_parcial, id_produto, id_pedido } = req.body;

    const novoItem_Pedido = {
        qtde,
        valor_parcial,
        id_produto,
        id_pedido
    }
    db.query('INSERT INTO produto SET = ?', novoItem_Pedido, (err, result) => {
        if (err) {
            console.error('Erro ao $adicionar item:', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return;
        }
        res.json({ message: 'pedido adicionado com sucesso' })
    })
}

exports.Atualizaritem_Pedido = (req, res) => {
    const { id_item } = req.params;
    const { qtde, valor_parcial, id_produto, id_pedido } = req.body;

    const novoItem_Pedido = {
        qtde,
        valor_parcial,
        id_produto,
        id_pedido
    }
    db.query('UPDATE item_pedido SET ? WHERE id_item = ?', [novoItem_Pedido, id_item], (err, result) => {
        if (err) {
            console.error('erro ao atualizar item', err);
            res.status(500).json({ error: 'erro interno do servidor' })
            return;
        }
        res.json({ message: 'item atualizado com sucesso' })
    });
};

exports.deletarItem = (req, res) => {
    const {id_item} = req.params;
    db.query('DELETE FROM pedido WHERE id_produto = ?', id_item, (err, result)=>{
        if(err){
            console.error('erro ao deletar item',err)
            res.status(500).json
            return;
        };
        res.json({ message: 'item deletado com sucesso'})
    });
};
