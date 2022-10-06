const express = require('express');
const mongoose = require('mongoose');
const { Joke } = require('./models/joke');
require('dotenv').config();

const app = express();
const mongoString = process.env.DATABASE_URL
app.use(express.json());

mongoose.connect(mongoString);
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.get("/jokes", async(req, res) => {
    const allJokes = await Joke.find();
    return res.status(200).json(allJokes);
});

app.post("/jokes", async(req, res) => {
    const newJoke = new Joke({...req.body});
    const insertedJoke = await newJoke.save();
    return res.status(201).json(insertedJoke);
})

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})