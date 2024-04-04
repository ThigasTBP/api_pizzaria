const db = require('./db');
const joi = require('joi');
const bcrypt = require('bcrypt');

const clienteSchema = joi.object({
    nome: joi.string().required(),
    endereco: joi.string().required(),
    bairro: joi.string().required(),
    cep: joi.string().length(8).required(),
    cpf: joi.string().length(11).required(),
    login: joi.string().required(),
    senha: joi.string().min(6).required()
})

exports.listaClientes = (req, res) => {
    db.query('select * from cliente', (err, result) => {
        if (err) {
            console.error('erro ao buscar cliente:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        };
        res.json(result);
    });
};

exports.buscarCliente = (req, res) => {
    const { cpf } = req.params;
    db.query('SELECT * FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('erro ao buscar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
            return;
        }
        res.json(result[0]);
    })
};

exports.adicionarCliente = (req, res) => {
    const { nome, endereco, bairro, cep, cpf, login, senha } = req.body;
    const { error } = clienteSchema.validate({ nome, endereco, bairro, cep, cpf, login, senha });

    if (error) {
        res.status(400).json({ error: 'Dados de clientes inválidos' });
        return;
    }
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        const novoCliente = {
            nome,
            endereco,
            bairro,
            cep,
            cpf,
            login,
            senha: hash
        };
        db.query('INSERT INTO cliente SET ?', novoCliente, (err, result) => {
            if (err) {
                console.error('Erro ao adicionar cliente:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return
            };
            res.json({ message: 'cliente adicionado com sucesso' });
        });
    });
};

exports.atualizarCliente = (req, res) => {
    const { cpf } = req.params;
    const { nome, endereco, bairro, cep, login, senha } = req.body;
    const { error } = clienteSchema.validate({ nome, endereco, bairro, cep, cpf, login, senha });
    if (error) {
        res.status(400).json({ error: 'Dados de cliente inválidos' });
        return;
    };
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        const clienteAtulizado = {
            nome,
            endereco,
            bairro,
            cep,
            login,
            senha: hash
        };
        db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtulizado, cpf], (err, result) => {
            if (err) {
                console.error('erro ao atualizar cliente:', err);
                res.status(500).json({ error: 'erro interno do servidor' });
                return;
            }
            res.json({ message: 'Cliente atualizado com secesso' });
        });
    });
};

exports.deleterCliente = (req, res) => {
    const { cpf } = req.params;
    db.query('DELETE FROM clienete WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao deletar cliente:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        }
        res.json({ message: 'cliente deletado com sucesso' });
    });
};