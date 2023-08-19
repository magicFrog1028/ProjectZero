const graphicsEngineService = require("../services/graphicsEngineService.js");
let graphicsEngineServices = new graphicsEngineService();
const graphicsRouter = async (server) =>{


    server.post(
        '/generateGraphics', async function handler (request, reply) {
            return await graphicsEngineServices.generateGraphicsByText(request.body.argumentStr);
        }
    );
    
}

module.exports = { graphicsRouter };