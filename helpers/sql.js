const mysql = require("mysql2/promise");
const cTable = require('console.table');


async function getRolesAndManagers() {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_database', password: "MyNewPass",});

    const roles = await connection.execute("SELECT roles.id, roles.title FROM roles")

    const managers = await connection.execute("SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS manager FROM employees" )

    const data = [];

    data.push(roles[0]);
    data.push(managers[0]);
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
};
