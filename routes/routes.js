const route = require('express').Router();
const jokeController = require('../controllers/jokeController');

route.post("/add", jokeController.addJoke);

route.get("/all", jokeController.getAllJokes);

route.get("/random", jokeController.getRandomJoke);

route.get("/joke/:id", jokeController.getJokeById);

 module.exports = route;