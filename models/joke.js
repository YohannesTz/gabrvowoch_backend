const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

const Joke = mongoose.model("Joke", JokeSchema);
module.exports = { Joke };