const DBManager = require("../database/databaseManager.js");
const databaseManager = new DBManager();


const userService = require("../services/userService.js");
const userServices = new userService();
const jwt = require("jsonwebtoken");

module.exports = class userService {
  constructor() {}

  async getBrands(uid){
    
    const BRANDS = await databaseManager.getTable('brands');
    let selectedUser = await userServices.getUserByUid(uid);
    if(selectedUser == null){ return []}
    let brands = [];
    for(let i=0;i<BRANDS.length;i++){
      if( selectedUser.user_uid == BRANDS[i].brand_userid && BRANDS[i].brand_status == "Active" ){
        let brand = BRANDS[i];
        let tempData = {
          id: brand.brand_uid,
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
