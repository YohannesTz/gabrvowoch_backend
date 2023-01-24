const { PrismaClient } = require("@prisma/client");
const genAPIKey = require("../util/utils").genRanHex;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const prisma = new PrismaClient();
const userController = {};

userController.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({
      success: false,
      data: null,
      error: { msg: "Please enter all fields!!" },
    });
  }

  try {
    const user_count = await prisma.user.count({
      where: {
        OR: {
          email,
          username,
        },
      },
    });

    let isDuplicate = user_count > 0 ? true : false;

    if (isDuplicate) {
      return res.json({
        success: false,
        data: null,
        error: { msg: "Email or Username already in use!!" },
      });
    } else {
      let pwd = bcrypt.hashSync(password, 8);
      let api_key = genAPIKey(8);

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: pwd,
          api_key,
          no_of_requests: 0,
        },
      });

      jwt.sign(
        { id: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
        (error, token) => {
          if (error) throw error;
          res.json({
            success: true,
            data : {
              token,
              newUser
            },
            error: null
          })
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      error: error.meta || { msg: "Error occurred check server log!" },
    });
  }
};

userController.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({
      success: false,
      data: null,
      error: { msg: "Please enter all fields!!" },
    });
  }

  try {
    const user = await prisma.user.findMany({
      where: { username }
    })

    if(user[0]){
      bcrypt.compare(password, user[0].password).then((result) => {
        if(result){
          const token = jwt.sign({ id: user[0].id}, process.env.JWT_SECRET,{ expiresIn: "30d" });
          res.json({
            success: true,
            data : {
              token,
              user: user[0]
            },
              error: null
          })
       }else{
         return res.json({
            success: false,
            data: null,
            error: {
              msg: "Invalid password!!"
            } 
         })
       }
    })}else{
      return res.json({
        success: false,
        data: null,
        error: {
          msg: "Invalid username!!",
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      error: error.meta || { msg: "Error occurred check server log!" },
    });
  }
};

module.exports = userController;
