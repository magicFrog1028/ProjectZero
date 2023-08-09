let testRoot = async (server) =>{
    server.get('/test', async function handler (request, reply) {
        return ":)"
    });
}


let rootRouter = async (server) =>{
    server.register(testRoot);
}

module.exports = { rootRouter };