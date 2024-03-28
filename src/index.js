const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const routes = require('./routes');

app.use(express.json());
app.use('/', routes);

app.listen(3333, ()=>{
console.log('SERVIDOR RODANDO')
});