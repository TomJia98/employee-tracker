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
            type:"number"
        },
        {
            type:"list",
            name:"department",
            message:"which department does your role fall under?",
            choices:deptsArr,

        }

])

const askUpdateEmployee = (data) => inquirer
.prompt ([
          {
            type:"list",
            name:"employeeName",
            message:"Which employee do you want to update",
            choices:data[3]
          },
          {
            type:"list",
            name:"employeeRole",
            message:"What role would you like to give them?",
            choices:data[1]
          }

])

const askEmployee = (data) => inquirer
.prompt ([
        {
        name:"firstName",
        message:"What is your emoloyees first name?",
        type:"input"
        },
        {
        name:"lastName",
        message:"What is your employees last name?",
        type:"input"

        },
        {
         type:"list",
         name:"title",
         message: "What is your employees title?",
         choices:data[1]
        },
        {
          type:"list",
          name:"manager",
          message: "Who is your employees manager?",
          choices:data[3]
         }


    ])

module.exports = {
    questions,
    askRole,
    askDepartment,
    askEmployee,
    askUpdateEmployee
}