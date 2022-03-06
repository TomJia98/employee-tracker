const mysql = require("mysql2/promise");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "MyNewPass",
  database: "employees_database",
});

const viewAllDepartments = function () {
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
  });
};




async function getDepartments() {

    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});
   
    const depts = await connection.execute('SELECT `name` FROM `departments`');
    let deptsArr = [];
    for (i=0; i < depts[0].length; i++){
        let string = depts[0][i].name;
        deptsArr.push(string);
    };//gets the object from the db and returns it as an array of strings
    return deptsArr 
  }





const viewAllRoles = function () {
  db.query(
    "SELECT roles.id, roles.title, departments.name, roles.salary FROM departments INNER JOIN roles ON departments.id = roles.department_id;",
    function (err, results) {
      console.table(results);
      if (err) {
        console.log(err);
      }
    }
  );
};

const viewAllEmployees = function () {//not working
  db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, employees.manager_id FROM ((employees INNER JOIN roles ON employees.role_id = role.id) INNER JOIN employees ON employees.manager_id = employees.id)",
    function (err, results) {
      console.table(results);
      if (err) {
        console.log(err);
      }
    }
  );
};

const addDepartment = function (data) {
  db.query(
    "INSERT INTO departments (name) VALUES (?)",
    [data.newDepartment],
    (err, results) => {
      if (err) {
        console.log(err);
      }
    }
  );
  console.log(`${data.newDepartment} added to the departments`);
};

const addRole = function (data) {
  db.query(
    "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
    [data.title, data.salary, data.department_id],
    (err, results) => {}
  );
};



module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  getDepartments,
};
