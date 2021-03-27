const express = require('express');
const routes = express.Router();

routes.get('/', (request, response) => {
    // __dirname é uma variavel de caminho absoluto.
    return response.sendFile(`${__dirname}/views/index.html`)
});
routes.get('/', (request, response) => {
    // __dirname é uma variavel de caminho absoluto.
    return response.sendFile(`${__dirname}/views/job.html`)
});
module.exports = routes;