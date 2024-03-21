const express = require('express');
const app = express();
const path = require('path');

const router = express.Router() 
router.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

app.use(router)
app.listen(3333, ()=>{
console.log('SERVIDOR RODANDO')
})