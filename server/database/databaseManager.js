const USERS = require("./mockupData/users").USER;
const BRANDS = require("./mockupData/brands").BRAND;
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

  async updateTable(tableName, data) {
    //This will be updated once DB is setup, local setup for now
    let table = tableName.toUpperCase();

    let dataInTable = DB[table];
    dataInTable.push(data);
    const strData = JSON.stringify(dataInTable);
    console.log(`TABLE[tableName]======updated 1 row====:`,data);
    fs.writeFile(
      `./mockupData/${table}.js`,
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
  }
};

function updateTable(tableName, data) {
  //This will be updated once DB is setup, local setup for now
  let table = tableName.toUpperCase();

  let dataInTable = DB[table];

  console.log(DB);
  dataInTable.push(data);
  const strData = JSON.stringify(dataInTable).replace(/\,(?!\s*?[\{\[\"\'\w])/g, '');;
  console.log(strData);
  fs.writeFile(
    `./mockupData/${table}.js`,
    `const ${table} = ${
      strData };\n module.exports = {
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
}
updateTable("users", {
  user_name: "码农2",
  user_username: "871556561@qq.com",
  user_password: "123456",
  user_uid: "b24ec016-e85b-49be-a697-40e627e75086",
  user_avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  user_status: "Active",
});
