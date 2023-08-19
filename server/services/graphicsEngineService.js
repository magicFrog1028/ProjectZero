const SDapi = require("../api_callout/SDapi");
module.exports = class graphicsEngineService{

    constructor(){};

    generateGraphicsByText = async (argumentStr) => {
        console.log("====string input:",argumentStr);
        let preRes = this.preProcess(argumentStr);
        return await SDapi.text2Image(preRes);
    };

    preProcess = (argumentStr) => {
    //Add argument string preprocess code here
    let args = {
        prompt:argumentStr,
        steps:1
    };
    return args;
    };
    
 
}