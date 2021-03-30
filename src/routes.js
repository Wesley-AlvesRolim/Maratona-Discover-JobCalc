const express = require('express');
const routes = express.Router();
const views = `${__dirname}/views/`

const profile = {
    name: 'Wesley',
    avatar: 'https://avatars.githubusercontent.com/u/78855198?v=4',
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 6,
    "vacation-per-year": 4,
}

routes.get('/', (request, response) => {
    // __dirname é uma variavel de caminho absoluto.
    return response.render(`${views}index`)
});
routes.get('/job/edit', (request, response) => {
    return response.render(`${views}job-edit`)
});
routes.get('/job', (request, response) => {
    return response.render(`${views}job`)
});
routes.get('/profile', (request, response) => {
    return response.render(`${views}profile`, { profile })
});
module.exports = routes;