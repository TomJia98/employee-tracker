const { questions, askDepartment, askRole, askEmployee, askUpdateEmployee } = require("./inquirer");
const {
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
} = require("./sql");

const askQuestions = () => {
  questions().then((data) => {
    switch (data.mainQuestion) {
      case "view all departments":
        viewAllDepartments();
        wait();
        break;
      case "view all roles":
        viewAllRoles();
        wait();
        break;
      case "view all employees":
        viewAllEmployees();
        wait();
        break;
      case "add a department":
        askDepartment().then((data) => {
          addDepartment(data)
          wait();
        });
        break;
      case "add a role":
        getDepartments().then((data) => askRole(data))
        .then((data) => {
        getDepartmentId(data).then((data)=>addRole(data))
        })
        .then(() => wait())
        break;
      case "add an employee":
        getRolesAndManagers().then((data) => {
          askEmployee(data).then((data) => {
            addEmployee(data).then(()=> wait())
        })
        })
        break;
      case "update an employee role":
        getRolesAndManagers().then((data)=> {
          askUpdateEmployee(data).then((data)=> {
            updateEmployee(data).then(()=> wait())
          })
        })
        break;

      case "quit":
        console.log("goodbye!");
        process.exit(1);
    }
  });
};

const wait = () =>
  setTimeout(() => {
    askQuestions();
  }, 1000);

module.exports = {
  askQuestions,
};
