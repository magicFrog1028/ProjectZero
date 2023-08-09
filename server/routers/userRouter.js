const userRouter = async (server) =>{


    server.post(
        '/getUser', async function handler (request, reply) {
            return "Hello its Kris"
        }
    );
    
    
}

module.exports = { userRouter };