const DBManager = require("../database/databaseManager.js");
const databaseManager = new DBManager();
const jwt = require("jsonwebtoken");
const { uuid } = require('uuidv4');

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
          { userid:  userDetail["user_uid "], username: userDetail["user_username"], password: userDetail["user_password"] },
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
    const user = {
      user_name:userInfo.name,
      user_username:userInfo.name,
      user_avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      user_password:userInfo.password,
      user_uid: uuid(),
      user_status:"Active"
    };
    let res = await databaseManager.insertOne('users',user);
    if(res && res != null && res != undefined){
      const token = jwt.sign(
        { username: res["user_username"], password: res["user_password"] },
        "key",
        { expiresIn: process.env.ACTIVATION_PERIOD }
      );
      const user = {
        name: res.user_name,
        username: res.user_username,
        uid: res.user_uid,
        avatar:res.avatar
      }
      return { res: 1, msg: "注册成功", token: token, user};
    }else{
      return { res: 0, msg: "注册失败", token: null };
    }
  }
};
