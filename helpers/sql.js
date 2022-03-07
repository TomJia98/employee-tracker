const mysql = require("mysql2/promise");
const cTable = require("console.table");
//gets requirements

async function updateEmployee(data) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees_database",
    password: "MyNewPass",
  });//connects to the database

  const roles_Id = await connection.execute(
    "SELECT `id` FROM `roles` WHERE `title` = (?)",
    [data.employeeRole]
  );//gets the id that matches the title that inputted

  const role_id = roles_Id[0][0].id;
//gets just the id number from the response and saves it to role_id
  const update = await connection.execute(
    "UPDATE `employees` SET role_id = (?) WHERE CONCAT(employees.first_name, ' ', employees.last_name) = (?)",
    [role_id, data.employeeName]
  );
  update;
  console.log(`${data.employeeName}s role has been updated`);
  //updates the database with the retreived id and inputted data
}

async function addEmployee(data) {
  let managerId = "";
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees_database",
    password: "MyNewPass",
  });//connects to the database

  const roleId = await connection.execute(
    "SELECT `id` FROM `roles` WHERE `title` = (?)",
    [data.title]
  );//gets the id that matches the title that inputted

  if (data.manager !== "None") {
    managerId = await connection.execute(
      "SELECT `id` FROM `employees` WHERE CONCAT(employees.first_name, ' ', employees.last_name) = (?)",
      [data.manager]
    );//gets the id that matches the employees name
  } else {
    managerId = "NULL";
  }
  let manager_id = "";
  if (managerId !== "NULL") {//if the managers id isnt null, set the id to manager_id, if it is null, sets manager_id
    manager_id = managerId[0][0].id;
  } else {
    manager_id = managerId;
  }
  const role_id = roleId[0][0].id;//sets the id to role_id

  const addingEmployee = await connection.execute(
    "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
    [data.firstName, data.lastName, role_id, manager_id]
  );
  addingEmployee;
  console.log(`${data.firstName} has been added to the database`);//inserts the data needed into the database
}

async function getRolesAndManagers() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees_database",
    password: "MyNewPass",
  });//connects to the database

  const roles = await connection.execute(
    "SELECT roles.id, roles.title FROM roles"
  );//gets the roles data from database

  const managers = await connection.execute(
    "SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS manager FROM employees"
  );//get employees data

  const data = [];

  let rolesArr = [];
  for (i = 0; i < roles[0].length; i++) {
    let string = roles[0][i].title;
    rolesArr.push(string);
  } //gets the object from the db and returns it as an array of strings

  let managersArr = [];
  for (i = 0; i < managers[0].length; i++) {
    let string = managers[0][i].manager;
    managersArr.push(string);
  }//sets the data from the database to an array of strings for easy use later
  managersArr.push("None");

  data.push(roles[0]);
  data.push(rolesArr);
  data.push(managers[0]);
  data.push(managersArr);
  return data;//adds all the data to data and returns it
}

async function addRole(data) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees_database",
    password: "MyNewPass",
  });//connects to the database

  const addingRole = await connection.execute(
    "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
    [data.title, data.salary, data.department_id]
  );//adds the data to the database
  addingRole;
  console.log(
    `new role successfully added under department ${data.department}`
  );
}

async function addDepartment(data) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees_database",
    password: "MyNewPass",
  });//connects to the database

  const addingDepartment = await connection.execute(
    "INSERT INTO departments (name) VALUES (?)",
    [data.newDepartment]
  );//adds the inputted data to the database
  addingDepartment;
  console.log(`${data.newDepartment} added to the departments`);
}

async function viewAllRoles() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees_database",
    password: "MyNewPass",
  });//connects to the database

  const rolesTable = await connection.execute(
    "SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM departments INNER JOIN roles ON departments.id = roles.department_id;"
  );
  const table = cTable.getTable(rolesTable[0]);
  console.log(table);//logs the roles table
}

async function viewAllDepartments() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees_database",
    password: "MyNewPass",
  });//connects to the database

  const departmentsTable = await connection.execute(
    "SELECT * FROM departments"
  );//gets the data from the departments table

  const table = cTable.getTable(departmentsTable[0]);

  console.log(table);
}

async function getDepartmentId(departmentName) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees_database",
    password: "MyNewPass",
  });//connects to the database

  const deptId = await connection.execute(
    "SELECT `id` FROM `departments` WHERE `name` = (?)",
    [departmentName.department]
  );//gets the id from departments for the inputted name
  departmentName.department_id = deptId[0][0].id;

  return departmentName;
}

async function getDepartments() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees_database",
    password: "MyNewPass",
  });//connects to the database

  const depts = await connection.execute("SELECT `name` FROM `departments`");
  let deptsArr = [];
  for (i = 0; i < depts[0].length; i++) {
    let string = depts[0][i].name;
    deptsArr.push(string);
  } //gets the object from the db and returns it as an array of strings
  return deptsArr;
}

async function viewAllEmployees() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employees_database",
    password: "MyNewPass",
  });//connects to the database

  const viewEmployees = await connection.execute(`SELECT employees.id,
    employees.first_name,
    employees.last_name,
    roles.title,
    departments.name AS department,
    roles.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON manager.id = employees.manager_id;`);

  const table = cTable.getTable(viewEmployees[0]);

  console.log(table);//displays the employee table in the console
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  getDepartments,
  getDepartmentId,
  addRole,
  getRolesAndManagers,
  addEmployee,
  updateEmployee,
};//exports 
