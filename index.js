const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const { Joke } = require('./models/joke');
const port = process.env.PORT || 5000;

require('dotenv').config();

const app = express();
const mongoString = process.env.DATABASE_URL

app.use(cors())
app.use(express.json({ limit: "1mb" }));
app.use(express.json());

mongoose.connect(mongoString);
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.get("/", async(req,res) => {
    return res.status(200).json("Server is running!");
});

app.get("/getJokes", async(req,res) => {
    return res.status(200).json("get jokes works!");
});

app.get("/jokes", async(req, res) => {
    const allJokes = await Joke.find();
    return res.status(200).json(allJokes);
});

app.get("/jokess", async(req,res) => {
    
})

app.post("/jokes", async(req, res) => {
    const newJoke = new Joke({...req.body});
    const insertedJoke = await newJoke.save();
    return res.status(201).json(insertedJoke);
})

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})
