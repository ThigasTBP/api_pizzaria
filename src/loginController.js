const db = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = 'thigas'

exports.loginCliente = (req, res) => {
    const { login, senha } = req.body;

    db.query('SELECT * FROM cliente WHERE login = ?', login, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ error: 'Cliente não encontrado' });
            return;
        }
        const cliente = results[0];

        bcrypt.compare(senha, cliente.senha, (err, passwordMatch) => {
            if (err || !passwordMatch) {
                res.status(401).json({ error: 'Credenciais inválidas' });
            } else {
                const token = jwt.sign({ login: cliente.login }, SECRET, { expiresIn: '1h' });
                res.status(200).json({
                    auth: true,
                    token,
                    message: 'Usuario Logado'
                });
            };
        });
    });
};

exports.autenticarToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'token não fornecido' });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'token inválido' });
        }
        req.usuario = decoded;
        next()
    });
};