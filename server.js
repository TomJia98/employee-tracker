const mysql = require('mysql2');
const inquirer =  require("inquirer");
const cTable = require('console.table');
const { viewAllDepartments, viewAllRoles } = require("./helpers/inquirer");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'MyNewPass',
      database: 'employees_db'
    },
    console.log("connected")
  );

// const viewAllDepartment = function() { 
  
// };
  
inquirer
.prompt([
  {
    type: 'list',
    message: 'What would you like to do',
    name: 'mainQuestion',
    choices: ['view all departments', ' view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']
  },
]).then(function(resp) {
    switch (resp.mainQuestion){
    case 'view all departments' :// add callbacks here
    viewAllDepartments(db)
         return;
    case ' view all roles':
    viewAllRoles(db)
         return;
    case 'view all employees':

         return;
    case 'add a department':

         return;
    case 'add a role':

         return;
    case 'add an employee':

         return;
    case 'update an employee role':

        return;
    case 'quit':

        return;
    }
}
)