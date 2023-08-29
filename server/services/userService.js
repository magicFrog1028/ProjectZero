const DBManager = require("../database/databaseManager.js");
const databaseManager = new DBManager();
const jwt = require("jsonwebtoken");


module.exports = class userService {
  constructor() {}
  
  async getUserByUsername(username) {
    const USERS = await databaseManager.getTable('users');
    for (let i = 0; i < USERS.length; i++) {
      if (USERS[i].user_username == username && USERS[i].user_status == "Active") {
        return USERS[i];
      }
    }
    return null;
  }

  async getUserByUid(uid) {
    const USERS = await databaseManager.getTable('users');
    for (let i = 0; i < USERS.length; i++) {
      if (USERS[i].user_uid == uid && USERS[i].user_status == "Active") {
        return USERS[i];
      }
    }
    return null;
  }


  async authorization(username, password) {
    let userDetail = await this.getUserByUsername(username);
    console.log("----authorized-----",userDetail);

    if (userDetail && userDetail != null && userDetail != undefined) {
      let success = userDetail["user_password"] == password ? true : false;
      if (success) {
        const token = jwt.sign(
          { username: userDetail["user_username"], password: userDetail["user_password"] },
          "key",
          { expiresIn: process.env.ACTIVATION_PERIOD }
        );
        const user = {
          name: userDetail.user_name,
          username: userDetail.user_username,
          uid: userDetail.user_uid,
          avatar: userDetail.user_avatar
        }
        return { res: 1, msg: "登录成功", token: token, user};
      } else {
        return { res: 0, msg: "密码不正确", token: null };
      }
    } else {
      return { res: 0, msg: "用户不存在", token: null };
    }
  }

  async authorization(username, password) {
    let userDetail = await this.getUserByUsername(username);
    console.log("----authorized-----",userDetail);

    if (userDetail && userDetail != null && userDetail != undefined) {
      let success = userDetail["user_password"] == password ? true : false;
      if (success) {
        const token = jwt.sign(
          { username: userDetail["user_username"], password: userDetail["user_password"] },
          "key",
          { expiresIn: process.env.ACTIVATION_PERIOD }
        );
        const user = {
          name: userDetail.user_name,
          username: userDetail.user_username,
          uid: userDetail.user_uid,
          avatar: userDetail.user_avatar
        }
        return { res: 1, msg: "登录成功", token: token, user};
      } else {
        return { res: 0, msg: "密码不正确", token: null };
      }
    } else {
      return { res: 0, msg: "用户不存在", token: null };
    }
  }

  async register(userInfo) {
    
  }
};
