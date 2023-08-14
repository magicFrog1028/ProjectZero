let testRoot = async (server) =>{
    server.get('/test', async function handler (request, reply) {
        return ":)"
    });
}


const rootRouter = async (server) =>{
    server.register(testRoot);
    server.register(require('./routers/userRouter.js').userRouter, { prefix: '/user' });
    server.register(require('./routers/graphicsEngineRouter.js').userRouter, { prefix: '/graphics' });
}

module.exports = { rootRouter };