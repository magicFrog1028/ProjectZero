import axios from "axios";
export default class loginService{

    constructor(){};

    async authenticate(username,password){
        let result = await axios({
            method: 'post',
            url: 'http://localhost:5000/user/authenticate',
            data: {
              username:username,
              password:password
            },
            headers: {
                // remove headers
              }
          });
        return result.data;
    }
}