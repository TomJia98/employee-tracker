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
//importing requirements from other files

const askQuestions = () => {
  questions().then((data) => {//asks the questions then breaks apart the answers to be worked on
    switch (data.mainQuestion) {
      case "view all departments":
        viewAllDepartments();//runs the view departments code
        wait();//waits after the table is shown to give the user some time to read it, then reasks the questions
        break;
      case "view all roles":
        viewAllRoles();
        wait();//runs the view roles code
        break;
      case "view all employees":
        viewAllEmployees();
        wait();//runs the view employees code
        break;
      case "add a department":
        askDepartment().then((data) => {//asks the department, then adds it to the database
          addDepartment(data)
          wait();
        });
        break;
      case "add a role":
        getDepartments().then((data) => askRole(data))//gets departments, asks the role, then adds to database
        .then((data) => {
        getDepartmentId(data).then((data)=>addRole(data))
        })
        .then(() => wait())
        break;
      case "add an employee":
        getRolesAndManagers().then((data) => {//gets the role titles and managers names
          askEmployee(data).then((data) => {//asks the user some questions
            addEmployee(data).then(()=> wait())//adds the responces to the database
        })
        })
        break;
      case "update an employee role":
        getRolesAndManagers().then((data)=> {//gets the role titles and managers names
          askUpdateEmployee(data).then((data)=> {//asks the user some questions
            updateEmployee(data).then(()=> wait())//makes the changes on the database
          })
        })
        break;

      case "quit":
        console.log("goodbye!");//logs goodbye then closes the application 
        process.exit(1);
    }
  });
};

const wait = () =>
  setTimeout(() => {//waits after the table is shown to give the user some time to read it, then re-asks the questions
    askQuestions();
  }, 1000);

module.exports = {
  askQuestions,
};
//exports
