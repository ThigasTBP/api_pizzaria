const mysql = require ('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'pizzariam'
})

db.connect((err)=> {
    if (err) {
        console.error('erro ao connectar ao MySQL', err);
    } else {
        console.log('conectado ao MySQL');
    }
});

module.exports = db;