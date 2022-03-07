const mysql = require("mysql2/promise");
const cTable = require('console.table');


async function updateEmployee(data) {
  const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});

  const roles_Id = await connection.execute('SELECT `id` FROM `roles` WHERE `title` = (?)', [data.employeeRole]);

    const role_id = roles_Id[0][0].id;



  const update = await connection.execute("UPDATE `employees` SET role_id = (?) WHERE CONCAT(employees.first_name, ' ', employees.last_name) = (?)", [role_id, data.employeeName])
  update;
  console.log(`${data.employeeName}s role has been updated`)
}

async function addEmployee(data) {

   let managerId = ""
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});

    const roleId = await connection.execute('SELECT `id` FROM `roles` WHERE `title` = (?)', [data.title]);
 
    if (data.manager !== "None") {
     managerId = await connection.execute("SELECT `id` FROM `employees` WHERE CONCAT(employees.first_name, ' ', employees.last_name) = (?)", [data.manager]);
      } else { 
         managerId = "NULL"
      }
let manager_id = ""
      if (managerId !== "NULL") {
       manager_id = managerId[0][0].id;
      } else {
        manager_id = managerId;
      }
      const role_id = roleId[0][0].id;

      const addingEmployee = await connection.execute("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
    [data.firstName, data.lastName, role_id, manager_id])
    addingEmployee
    console.log(`${data.firstName} has been added to the database`)


}

async function getRolesAndManagers() {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});

    const roles = await connection.execute("SELECT roles.id, roles.title FROM roles")

    const managers = await connection.execute("SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS manager FROM employees" )

    const data = [];


    let rolesArr = [];
    for (i=0; i < roles[0].length; i++){
        let string = roles[0][i].title;
        rolesArr.push(string);
    };//gets the object from the db and returns it as an array of strings
     
    let managersArr = [];
    for (i=0; i < managers[0].length; i++){
        let string = managers[0][i].manager;
        managersArr.push(string);
    };
    managersArr.push("None")


    data.push(roles[0]);
    data.push(rolesArr)
    data.push(managers[0]);
    data.push(managersArr)
    return data

}


  async function addRole(data) {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});

    const addingRole = await connection.execute("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
    [data.title, data.salary, data.department_id])
    addingRole
    console.log(`new role successfully added under department ${data.department}`)

  };

async function addDepartment(data) {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});

    const addingDepartment = await connection.execute("INSERT INTO departments (name) VALUES (?)",[data.newDepartment])
    addingDepartment;
    console.log(`${data.newDepartment} added to the departments`)
};


async function viewAllRoles() {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});

    const rolesTable = await connection.execute("SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM departments INNER JOIN roles ON departments.id = roles.department_id;")
    const table = cTable.getTable(rolesTable[0]);
    console.log(table)

};


async function viewAllDepartments() {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});

    const departmentsTable = await connection.execute("SELECT * FROM departments")

    const table = cTable.getTable(departmentsTable[0]);

    console.log(table);
} ;


async function getDepartmentId(departmentName) {
    

    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});

    const deptId = await connection.execute('SELECT `id` FROM `departments` WHERE `name` = (?)', [departmentName.department]);
    departmentName.department_id = deptId[0][0].id;

    return departmentName;


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
  };


async function viewAllEmployees() {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});

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
    LEFT JOIN employees manager ON manager.id = employees.manager_id;`)

      const table = cTable.getTable(viewEmployees[0]);

      console.log(table);
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
};
