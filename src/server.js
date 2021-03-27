const express = require('express');
const server = express();
const routes = require('./routes')
    //definindo uma rota 'padrao' a partir dai vai ser criado todas as rotas
server.use(express.static('public'))
server.use(routes)
server.listen(5500, () => {})