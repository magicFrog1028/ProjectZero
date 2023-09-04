const DBManager = require("../database/databaseManager.js");
const databaseManager = new DBManager();
const { uuid } = require("uuidv4");

const userService = require("../services/userService.js");
const userServices = new userService();
const jwt = require("jsonwebtoken");

module.exports = class userService {
  constructor() {}

  async getBrands(uid) {
    const BRANDS = await databaseManager.getTable("brands");
    let selectedUser = await userServices.getUserByUid(uid);
    if (selectedUser == null) {
      return [];
    }
    let brands = [];
    for (let i = 0; i < BRANDS.length; i++) {
      if (
        selectedUser.user_uid == BRANDS[i].brand_userid &&
        BRANDS[i].brand_status == "Active"
      ) {
        let brand = BRANDS[i];
        let tempData = {
          id: brand.brand_uid,
          brandName: brand.brand_name,
          brandLogo: brand.brand_logo,
          brandMetadata: brand.brand_metadata,
        };
        brands.push(tempData);
      }
    }
    return brands;
  }

  async createBrand(brandInfo, token) {
    let userid = jwt.verify(token, "key", (err, data) => {
      return data.userid;
    });
    if (
      brandInfo.name &&
      brandInfo.metadata &&
      brandInfo.name != null &&
      brandInfo.metadata != null &&
      brandInfo.name != undefined &&
      brandInfo.metadata != undefined
    ) {
      const brand = {
        brand_name: brandInfo.name,
        brand_userid: userid,
        brand_logo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        brand_metadata: brandInfo.metadata,
        brand_uid: uuid(),
        brand_status: "Active",
      };

      let res = await databaseManager.insertOne("brands", brand);
      if (res && res != null && res != undefined) {
        const brand = {
          id: res.brand_uid,
          brandName: res.brand_name,
          brandLogo: res.brand_logo,
          brandMetadata: res.brand_metadata,
        };
        return { res: 1, msg: "Brand添加成功", data: brand };
      } else {
        return { res: 0, msg: "Brand添加失败", data: null };
      }
    } else {
      return { res: 0, msg: "Brand添加失败", data: null };
    }
  }
};
