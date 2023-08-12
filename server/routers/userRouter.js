const userService = require("../services/userService.js");
let userServices = new userService();
const userRouter = async (server) =>{


    server.post(
        '/getUsername', async function handler (request, reply) {
            return userServices.getUsername();
        }
    );


    server.post(
        '/getPassword', async function handler (request, reply) {
            return userServices.getPassword();
        }
    );
    
    
}

module.exports = { userRouter };