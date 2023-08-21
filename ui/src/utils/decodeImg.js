import fs from 'fs';

function decodeImg(base64, filePath){
const dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
fs.writeFile(filePath, dataBuffer, function(err){//用fs写入文件
    if(err){
        console.log(err);
    }else{
        console.log('写入成功！');
    }
});
}



export default decodeImg 