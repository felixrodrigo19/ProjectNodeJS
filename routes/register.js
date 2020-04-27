var express = require('express');
var router = express.Router();

router.get('/register', (req,res)=>{
    res.send('register')
});

router.post('/register', (req,res)=>{
    let data = req.body
    let nome = req.body.nome
    res.send('ok')
    console.log(nome)
});

module.exports = router;