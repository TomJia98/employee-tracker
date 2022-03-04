const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // MySQL password
      password: "MyNewPass",
      database: "employees_db",
    },
  );


const viewAllDepartments = function() { 
    db.query("SELECT * FROM department", function (err, results) {
        console.table(results);
    })
};

const viewAllRoles = function() { 
    db.query("SELECT * FROM roles", function (err, results) {
        console.table(results);
    })
};

module.exports = {viewAllDepartments, viewAllRoles}