// we are creating the database conncetion
const Sequelize = require("sequelize");
//Sequelize(<DB name>,<username>,<password>,options)
//UserName and password needs to be kept secret or can be put ENV varibales
const sequelize = new Sequelize("nodemysql", "root", "mindtree", {
  dialect: "mysql",
  host: "localhost",
  operatorsAliases: false
});
module.exports = sequelize;
