const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { viewAllDepartments, viewAllRoles } = require("./helpers/inquirer");

// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     // MySQL username,
//     user: "root",
//     // MySQL password
//     password: "MyNewPass",
//     database: "employees_db",
//   },
//   console.log("connected")
// );


const questions = () => inquirer
.prompt([
  {
    type: "list",
    message: "What would you like to do",
    name: "mainQuestion",
    choices: [
      "view all departments",
      " view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
      "quit",
    ],
  },
]).then((data) => {
if (data.mainQuestion == "view all departments"){
  viewAllDepartments()
  setTimeout(() => {  questions(); }, 500);//cannot get the .then to chain from the viewAlls, and anything after it would overwrite the results
} else if (data.mainQuestion == " view all roles") {
  viewAllRoles()
  setTimeout(() => {  questions(); }, 500);
}


});

questions()