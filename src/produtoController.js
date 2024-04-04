const db = require('./db')
const joi = require('joi')

const produtoSchema = joi.object({
    nome_produto: joi.string().required(),
    descricao: joi.string().required(),
    valor_unitario: joi.string().required(),
    imagem: joi.string()
})

exports.listaProdutos = (req, res) => {
    db.query('SELECT * FROM produto', (err, result) => {
        if (err) {
            console.error('erro ao buscar produtos:', err);
            res.status(500).json({ error: 'erro interno do servidor' });
            return;
        };
        res.json(result);
    });
};

exports.buscaProdutos=(req,res)=>{
    const {nome_produto} = req.params;
    db.query('SELECT * FROM produtos WHERE nome_produto = ?',)
}

