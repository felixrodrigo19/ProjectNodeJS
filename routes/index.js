/**
 * Rotas root onde realiza busca geral ou filtradas de clientes no banco de dados
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("Start")
  // Buscar usuarios no banco ao entrar na aplicacao ou em uma url invalida
});

/* GET a client that ends with the letter ... */
var cb0 = function (req, res, next) {
  // funcao que chama a funcao de busca com filtro no banco 
  console.log(`Iniciando a busca por cliente que terminem com ${req.params.endId}`);
  next();
}

var cb1 = function (req, res) {
  // funcao que retorna o resultado e exibe para o front-end
  res.send(`Retorno da busca de clientes que terminam com ${req.params.endId}`);
}

// faz a chamada para a matriz de funcao
router.get('/q/:endId', [cb0, cb1]);

module.exports = router;
