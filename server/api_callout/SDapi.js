
    const sdURL = process.env.SD_HOST  + process.env.SD_PORT
    const axios = require('axios');

    async function text2Image(args){
        console.log("sdURL====",sdURL);
        console.log("sd api=====0",args);
        let res=  await axios({
            method: 'post',
            url: sdURL+"/sdapi/v1/txt2img",
            data: args
        });
        
        if(res.data && res.data != undefined){
            return res.data
        }
    }


    module.exports ={ text2Image }