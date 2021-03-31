const express = require('express');
const server = express();
const routes = require('./routes');
const urlencoded = express.urlencoded({ extended: true });

server.set('view engine', 'ejs');
//definindo uma rota 'padrao' a partir dai vai ser criado todas as rotas
server.use(express.static('public'));
server.use(urlencoded);
server.use(routes);
server.listen(5500);