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

    server.post(
        '/authenticate', async function handler (request, reply) {
            
                console.log("----authenticate-----",request.body);
            return userServices.authenticate(request.body.username, request.body.password);
        }
    );
    
    
}

module.exports = { userRouter };