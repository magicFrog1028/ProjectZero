const userService = require("../services/userService.js");
const userServices = new userService();
const jwt = require("jsonwebtoken");
const res = require("../utils/response").res;
const extractToken = require("../utils/extractToken").extractToken;
const userRouter = async (server) =>{


    server.post(
        '/login', async function handler (request, reply) {
            
                console.log("----authorization-----",request.body);
            let data = await userServices.authorization(request.body.username, request.body.password);
            if(data.res == 1){
                res(200, {token:data.token, user:data.user}, data.msg, reply);
            }else{
                res(403, {}, data.msg, reply);
            }
        }
    );

    server.post(
        '/register', async function handler (request, reply) {
            
                console.log("----registration-----",request.body);
            let data = await userServices.register(request.body);
            if(data.res == 1){
                res(200, {token:data.token, user:data.user}, data.msg, reply);
            }else{
                res(403, {}, data.msg, reply);
            }
        }
    );





    server.post(
        '/checkJWT', {preValidation:[server.authorization]},async function handler (request, reply) {
            
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