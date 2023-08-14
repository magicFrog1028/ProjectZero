module.exports = class graphicsEngineService{

    constructor(){};

    generateGraphics = async (argumentStr) => {
        console.log("====string input:",argumentStr);
        this.preProcess(argumentStr);
        return "a";
    };

    preProcess = (argumentStr) => {
    //Add argument string preprocess code here
    return argumentStr;
    };
 
}