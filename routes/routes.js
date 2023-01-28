const route = require('express').Router();
const jokeController = require('../controllers/jokeController');
const userController = require('../controllers/userController');
const middlewares = require('../middleware/auth');

// User enpoints
route.post("/signup", userController.signUp);

route.post("/login", userController.login);

// Joke endpoints 
route.post("/add", middlewares.auth_api_key ,jokeController.addJoke);

route.get("/all", middlewares.auth_api_key, jokeController.getAllJokes);

route.get("/random", middlewares.auth_api_key, jokeController.getRandomJoke);

route.get("/joke/:id", middlewares.auth_api_key, jokeController.getJokeById);

route.put("/like/:id", middlewares.auth_api_key, jokeController.like);


 module.exports = route;