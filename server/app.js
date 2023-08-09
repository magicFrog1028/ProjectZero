require("dotenv").config();
const rootRouter = require('./rootRouter.js').rootRouter;
const server = require('fastify')({ logger: true });
server.register(rootRouter);


const startServer = async () => {

    //server start
    await server.listen(process.env.SERVER_HOST_PORT);
    server.log.info('Server Running On');


    
    /*Database code
    =================================
    =================================
    */

};


startServer();
