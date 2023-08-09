require("dotenv").config();
const rootRouter = require('./rootRouter.js').rootRouter;

const server = require('fastify')({ logger: true });

const startServer = async () => {
    await server.listen(process.env.SERVER_HOST_PORT);
    server.log.info('Server Running On');
};
startServer();
