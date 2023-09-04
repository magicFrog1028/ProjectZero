const brandService = require("../services/brandService.js");
const brandServices = new brandService();
const res = require("../utils/response").res;
const brandRouter = async (server) =>{


    server.post(
        '/', {preValidation:[server.authorization]},async function handler (request, reply) {
            console.log("----get brands-----",request.body);
            let brands =  await brandServices.getBrands(request.body.uid);
            let msg =  brands.length > 0 ? "查询成功" : "没有相关数据";
            res(200,brands,msg,reply);
        }
    );

    server.post(
        '/create', {preValidation:[server.authorization]},async function handler (request, reply) {
            console.log("----create one brand-----",request.body);
            let brand =  await brandServices.createBrand(request.body, request.headers["authorization"]);
            res(200,brand.data,brand.msg,reply);       
        }
    );
    
    
}

module.exports = { brandRouter };