const express = require("express");
const routes = express.Router();
// __dirname é uma variavel de caminho absoluto.
const views = `${__dirname}/views/`;

const job = {
    data: [{
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 6,
        "total-hours": 15,
        createdAt: Date.now(),
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 40,
        createdAt: Date.now(),
    }
    ],
    controllers: {
        index(request, response) {
            const updatesJobs = job.data.map(jobElement => {
                const remaining = job.services.remainingDay(jobElement)
                const status = remaining <= 0 ? 'done' : 'progress'
                return {
                    ...jobElement,
                    remaining,
                    status,
                    budget: profile.data["value-hour"] * jobElement["total-hours"]
                };
            });
            return response.render(`${views}index`, { jobs: updatesJobs });
        },
        save(request, response) {
            const id = job.data[job.data.length - 1].id + 1 || 1;
            const valuesInInputs = {
                id: id,
                name: request.body.name,
                "daily-hours": request.body["daily-hours"],
                "total-hours": request.body["total-hours"],
                createdAt: Date.now(),
            };
            job.data.push(valuesInInputs);
            return response.redirect("/");
        },
        create(request, response) {
            return response.render(`${views}job`);
        },
    },
    services: {
        remainingDay(job) {
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(2);
            const date = new Date(job.createdAt);
            const dueDay = date.getDate() + Number(remainingDays);
            const dueDateInMs = date.setDate(dueDay)
            const timeDiffMs = dueDateInMs - Date.now()
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffMs / dayInMs)
            return dayDiff;
        }
    }
}
const profile = {
    data: {
        name: "Wesley",
        avatar: "https://avatars.githubusercontent.com/u/78855198?v=4",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 6,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
        index(request, response) {
            return response.render(`${views}profile`, { profile: profile.data });
        },
        update(request, response) {
            const data = request.body;
            const weeksPerYear = 52;
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
            const monthlyTotalHours = weekTotalHours * weeksPerMonth;
            const valueHour = data["monthly-budget"] / monthlyTotalHours
            profile.data = {
                ...profile.data,
                ...data,
                "value-hour": valueHour
            }
            return response.redirect('/profile')
        }
    }
};

routes.get("/", job.controllers.index);

routes.get("/job", job.controllers.create);

routes.post("/job", job.controllers.save);

routes.get("/job/edit", (request, response) => {
    return response.render(`${views}job-edit`);
});

routes.get("/profile", profile.controllers.index);
routes.post("/profile", profile.controllers.update);

module.exports = routes;