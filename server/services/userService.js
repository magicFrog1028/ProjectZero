const USERS = require("../mockupData/user").USER;
const jwt = require("jsonwebtoken");
module.exports = class userService {
  constructor() {}
  getUser(username) {
    console.log(USERS);
    for (let i = 0; i < USERS.length; i++) {
      if (USERS[i].username == username) {
        return USERS[i];
      }
    }
    return null;
  }

  async authenticate(username, password) {
    let userDetail = this.getUser(username);
    console.log(userDetail);

    if (userDetail && userDetail != null && userDetail != undefined) {
      let success = true ? userDetail["password"] == password : false;
      if (success) {
        console.log(process.env.ACTIVATION_PERIOD );
        const token = jwt.sign(
          { username: userDetail["username"], password: userDetail["password"] },
          "key",
          { expiresIn: process.env.ACTIVATION_PERIOD }
        );
        return { res: 1, msg: "登录成功", token: token };
      } else {
        return { res: 0, msg: "密码不正确", token: null };
      }
    } else {
      return { res: 0, msg: "用户不存在", token: null };
    }
  }
};
