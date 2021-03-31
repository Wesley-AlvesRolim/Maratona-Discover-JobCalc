const express = require('express');
const routes = express.Router();
const views = `${__dirname}/views/`
const jobs = [{
        id: 1,
        name: 'Pizzaria Guloso',
        "daily-hours": 6,
        "total-hours": 80,
        createdAt: Date.now()
    },
    {
        id: 2,
        name: 'OneTwo Project',
        "daily-hours": 3,
        "total-hours": 40,
        createdAt: Date.now()
    }
];
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
    return response.render(`${views}index`, { jobs })
});
routes.get('/job', (request, response) => {
    return response.render(`${views}job`)
});
routes.post('/job', (request, response) => {
    const id = jobs[jobs.length - 1].id + 1 || 1
    const valuesInInputs = {
        id: id,
        name: request.body.name,
        "daily-hours": request.body["daily-hours"],
        "total-hours": request.body["total-hours"],
        createdAt: Date.now()
    };
    jobs.push(valuesInInputs);
    return response.redirect('/')
});
routes.get('/job/edit', (request, response) => {
    return response.render(`${views}job-edit`)
});
routes.get('/profile', (request, response) => {
    return response.render(`${views}profile`, { profile })
});

module.exports = routes;