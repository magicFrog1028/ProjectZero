const SDapi = require("../api_callout/SDapi");
const decodeImg = require("../utils/decodeImg").decodeImg;
module.exports = class graphicsEngineService{

    constructor(){};

    generateGraphicsByText = async (argumentStr) => {
        console.log("====string input:",argumentStr);
        let preRes = this.preProcess(argumentStr);
        let images =  await SDapi.text2Image(preRes);
        let postRes = this.postProcess(images);
        return images;
    };

    preProcess = (argumentStr) => {
    //Add argument string preprocess code here
    let args = {
        prompt:argumentStr,
        steps:1
    };
    return args;
    };


    postProcess = (images) => {
        //Add document preprocess code here(basically save image to FS system/DB and save record in DB)
        
        for(let i = 0; i <= images.length;i++){
            decodeImg(images[i], "../server/files/test.png");
        }
        
    };
    
 
}