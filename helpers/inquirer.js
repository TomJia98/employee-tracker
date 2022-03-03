const inquirer = require("inquirer");
const cTable = require('console.table');


const viewAllDepartments = function(db) { 
    db.query("SELECT * FROM department", function (err, results) {
        console.table(results);
    })
};

const viewAllRoles = function(db) { 
    db.query("SELECT * FROM role", function (err, results) {
        console.table(results);
    })
};

module.exports = {viewAllDepartments, viewAllRoles}