const USERS = require("./mockupData/users").USERS;
const BRANDS = require("./mockupData/brands").BRANDS;
const fs = require("fs");
const DB = {
  USERS: USERS,
  BRANDS: BRANDS,
};

module.exports = class databaseManager {
  constructor() {}

  async getTable(tableName) {
    //This will be updated once DB is setup, local setup for now
    switch (tableName) {
      case "users":
        return USERS;
      case "brands":
        return BRANDS;
    }
  }

  async insertOne(tableName, data) {
    //This will be updated once DB is setup, local setup for now
    let table = tableName.toUpperCase();

    let dataInTable = DB[table];
    dataInTable.push(data);
    const strData = JSON.stringify(dataInTable);
    console.log(`TABLE[tableName]======updated 1 row====:`,data);
    fs.writeFile(
      `./database/mockupData/${tableName}.js`,
      `const ${table} = ` +
        strData +
        `;\n module.exports = {
        ${table}
    }`,
      (error) => {
        // throwing the error
        // in case of a writing problem
        if (error) {
          // logging the error
          console.error(error);

          throw error;
        }
      }
    );
    return data;
  }

  async insertMany(tableName, data) {
    //This will be updated once DB is setup, local setup for now
    let table = tableName.toUpperCase();

    let dataInTable = DB[table];
    for (let i =0; i<data.length;i++){
      dataInTable.push(data[i]);
    }
    
    const strData = JSON.stringify(dataInTable);
    console.log(`TABLE[tableName]======updated 1 row====:`,data);
    fs.writeFile(
      `./mockupData/${tableName}.js`,
      `const ${table} = ` +
        strData +
        `;\n module.exports = {
        ${table}
    }`,
      (error) => {
        // throwing the error
        // in case of a writing problem
        if (error) {
          // logging the error
          console.error(error);

          throw error;
        }
      }
    );
    return data;
  }
};