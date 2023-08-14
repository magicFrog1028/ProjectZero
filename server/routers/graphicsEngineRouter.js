const graphicsEngineService = require("../services/graphicsEngineService.js");
let graphicsEngineServices = new graphicsEngineService();
const graphicsEngine = async (server) =>{


    server.post(
        '/generateGraphics', async function handler (request, reply) {
            return userServices.genrateGraphics(request.body.argumentStr);
        }
    );
    
}

module.exports = { graphicsEngineRouter };