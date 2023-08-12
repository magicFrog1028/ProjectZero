module.exports = class userService{

    constructor(){};

    getUsername(){
        return "Admin";
    }

    getPassword(){
        return "Admin";
    }

    authenticate(username,password){
        if(username == "Admin" && password == "Admin"){return true}else{return false}
    } 
}