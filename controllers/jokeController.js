const { PrismaClient } = require("@prisma/client");
const jokeController = {};
const prisma = new PrismaClient();

jokeController.addJoke = async (req, res) => {
  const { title, description, likes } = req.body;

  if (!title || !description || likes < 0) {
    return res.json({
      success: false,
      data: null,
      error: { msg: "Please enter all fields!!" },
    });
  }

  try {
    const joke = await prisma.joke.create({
      data: {
        title,
        description,
        likes,
      },
    });

    res.json({
      success: true,
      data: joke,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      error: error.meta || { msg: "Error occurred check server log!" },
    });
  }
};

jokeController.getAllJokes = async (req, res) => {
  const take = parseInt(req.query.take);
  const skip = parseInt(req.query.skip);

  if (take < 0 || skip < 0) {
    return res.json({
      success: false,
      data: null,
      error: { msg: "Please enter all fields!!" },
    });
  }

  try {
    const jokes = await prisma.joke.findMany({
      skip,
      take,
      where: {},
    });

    res.json({
      success: true,
      data: jokes,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      error: error.meta || { msg: "Error occurred check server log!" },
    });
  }
};

jokeController.getRandomJoke = async (req, res) => {
  try {
    const jokes = await prisma.joke.findMany({ where: {} });
    let ids = [];
    jokes.map((j) => {
      ids = [...ids, j.id];
    });
    
    const id = ids[Math.floor(Math.random()*ids.length)];

    const jokee = await prisma.joke.findMany({
      where: {
        id: id
      }
    })

    res.json({
      success: true,
      data: jokee,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      error: error.meta || { msg: "Error occurred check server log!" },
    });
  }
};

jokeController.getJokeById = async(req, res) => {
  const id = req.params.id;

  console.log(id);

  if(!id){
    return res.json({
      success: false,
      data: null,
      error: { msg: "Please enter all fields!!" },
    });
  }

  try {
    const joke = await prisma.joke.findMany({
      where: {
        id
      }
    })

    res.json({
      success: true,
      data: joke,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      error: error.meta || { msg: "Error occurred check server log!" },
    });
  }
}

module.exports = jokeController;
