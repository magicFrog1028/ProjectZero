const BRANDS = require("../mockupData/brand").BRAND;
const userService = require("../services/userService.js");
const userServices = new userService();
const jwt = require("jsonwebtoken");

module.exports = class userService {
  constructor() {}

  async getBrands(username){
    let selectedUser = await userServices.getUser(username);
    let brands = [];
    for(let i=0;i<BRANDS.length;i++){
      if( selectedUser.user_uid == BRANDS[i].brand_userid ){
        let brand = BRANDS[i];
        let tempData = {
          brandName: brand.brand_name,
          brandLogo:brand.brand_logo,
          brandMetadata:brand.brand_metadata
        };
        brands.push(tempData);
      }
    }
    return brands;

  }
};
