const userService = require("../services/userService.js");
const userServices = new userService();
const jwt = require("jsonwebtoken");
const userRouter = async (server) =>{


    server.post(
        '/login', async function handler (request, reply) {
            
                console.log("----authenticate-----",request.body);
            return userServices.authenticate(request.body.username, request.body.password);
        }
    );

    server.post(
        '/checkJWT', async function handler (request, reply) {
            
            console.log("----jwt----",request.headers);
            let token = request.headers['authorization'].split(" ")[1];
            console.log(token);
            return jwt.verify(token, 'key', (err, data) => {
                if (err) return err
            
                return data
            
              })
        }
    );
    
    
}

module.exports = { userRouter };