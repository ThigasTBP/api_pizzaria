const db = require('./db')
const joi = require('joi')

const produtoSchema = joi.object({
    nome_produto: joi.string().required(),
    descricao: joi.string().required(),
    valor_unitario: joi.string().required(),
    imagem: joi.string()
})

exports.listaProduto = (req, res) => {
    db.query('SELECT * FROM produto', (err, result) => {
        if (err) {
            console.error('erro ao buscar produtos:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        };
        res.json(result);
    });
};

exports.buscarProdutoID = (req, res) => {
    const { id_produto } = req.params;
    db.query('SELECT * FROM produto WHERE id_produto = ?', id_produto, (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto', err);
            res.status(500).json({ error: 'Error interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }
        res.json(result[0])
    })
};
exports.buscaProduto = (req, res) => {
    const { nome_produto } = req.params;
    db.query('SELECT * FROM produto WHERE nome_produto LIKE ?', [`${nome_produto}%`], (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' })
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' })
            return;
        }
        res.json(result)
    })
};

exports.adicionarProduto = (req, res) => {
    const { nome_produto, descricao, valor_unitario, imagem } = req.body;
    const { error } = produtoSchema.validate({ nome_produto, descricao, valor_unitario, imagem })

    if (error) {
        res.status(400).json({ error: 'Dados de produto inválidos' });
        return
    }
    const novoProduto = {
        nome_produto,
        descricao,
        valor_unitario,
        imagem
    }
    db.query('INSERT INTO produto SET = ?', novoProduto, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        };
        res.json({ message: 'produto adicionado com sucesso' });
    });
};

exports.atualizarProduto = (req, res) => {
    const { id_produto } = req.params;
    const { nome_produto, descricao, valor_unitario, imagem } = req.body;
    const { error } = produtoSchema.validate({ nome_produto, descricao, valor_unitario, imagem })

    if (error) {
        res.status(400).json({ error: 'Dados de produtos inválidos' });
        return;
    }
    const novoProduto = {
        nome_produto,
        descricao,
        valor_unitario,
        imagem
    }
    db.query('UPDATE produto SET ? WHERE id_produto = ?', [novoProduto, id_produto], (err, result) => {
        if (err) {
            console.error('erro ao atualizar produto', err);
            res.status(500).json({ error: 'erro interno do servidor' })
            return;
        }
        res.json({ message: 'produto atualizado com sucesso' })
    });
};

exports.deletarProduto = (req, res) => {
    const { id_produto } = req.params;
    db.query('DELETE FROM produto WHERE id_produto = ?', id_produto, (err, result) => {
        if (err) {
            console.error('Erro ao deletar produto', err)
            res.status(500).json
            return;
        };
        res.json({ message: 'produto deletado com sucesso' })
    });
};
