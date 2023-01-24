const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const middlewares = {};

middlewares.auth_api_key = async(req, res, next) => {
    const api_key = req.query.api_key;

    try {
        const users = await prisma.user.findMany({
            where: {
                api_key
            }
        })
        if(users[0]){
            let no_of_requests = users[0].no_of_requests;
            no_of_requests++;
            await prisma.user.update({
                where: {
                    id: users[0].id
                },
                data: {
                    no_of_requests
                }
            })
            next();
        }else{
            return res.json({
                success: false,
                data: null,
                error: { msg: 'Invalid api key!!' }
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            data: null,
            error: error.meta || { msg: "Error occurred check server log!" }
        })
    }
}

module.exports = middlewares;