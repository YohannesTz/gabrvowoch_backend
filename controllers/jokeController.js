const { PrismaClient } = require("@prisma/client");
const jokeController = {};
const prisma = new PrismaClient();

jokeController.getAllJokes = async(req, res) => {
    const take = parseInt(req.params.take);
    const skip = parseInt(req.params.skip);

    if(!take || !skip){

    }

    try {
        
    } catch (error) {
        
    }
}

module.exports = jokeController;