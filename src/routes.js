const express = require("express");
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');
const jobController = require('./controllers/JobController')


routes.get("/", jobController.index);
routes.get("/job", jobController.create);
routes.post("/job", jobController.save);
routes.get("/job/:id", jobController.show);
routes.post("/job/:id", jobController.update);
routes.post("/job/delete/:id", jobController.delete);

routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

module.exports = routes;