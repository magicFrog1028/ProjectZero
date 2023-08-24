const brandService = require("../services/brandService.js");
const brandServices = new brandService();
const brandRouter = async (server) =>{


    server.post(
        '/', async function handler (request, reply) {
            
                console.log("----get brands-----",request.body);
            return brandServices.getBrands(request.body.username);
        }
    );
    
    
}

module.exports = { brandRouter };