const USERS = require("../mockupData/user").USER;
const jwt = require("jsonwebtoken");
module.exports = class userService {
  constructor() {}
  async getUser(username) {
    console.log(USERS);
    for (let i = 0; i < USERS.length; i++) {
      if (USERS[i].user_username == username) {
        return USERS[i];
      }
    }
    return null;
  }

  async authorization(username, password) {
    let userDetail = await this.getUser(username);
    console.log("authenticate---",userDetail);

    if (userDetail && userDetail != null && userDetail != undefined) {
      let success = true ? userDetail["user_password"] == password : false;
      if (success) {
        const token = jwt.sign(
          { username: userDetail["user_username"], password: userDetail["user_password"] },
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
