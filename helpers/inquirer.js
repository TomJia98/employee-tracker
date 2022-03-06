const inquirer = require("inquirer");





const questions = () => inquirer
.prompt([
  {
    type: "list",
    message: "What would you like to do",
    name: "mainQuestion",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
      "quit",
    ],
  },
]);

const askDepartment = () => inquirer
.prompt([
        {
            name:"newDepartment",
            message:"What is the name of your new department?",
            type:"input"
        }
    
]);

const askRole = (deptsArr) => inquirer
.prompt([
        {
            name:"title",
            message:"what is the title of your new role?",
            type:"input"
        },
        {
            name:"salary",
            message:"What is the salary of this role?",
            type:"input"
        },
        {
            type:"list",
            name:"department",
            message:"which department does your role fall under?",
            choices:deptsArr,

        }

])

module.exports = {
    questions,
    askRole,
    askDepartment
}