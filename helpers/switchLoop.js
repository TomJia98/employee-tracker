const { questions, askDepartment, askRole } = require("./inquirer");
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  getDepartments,
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
          addDepartment(data);
          wait();
        });
        break;
      case "add a role":
        getDepartments().then((data) => askRole(data));

        break;
      case "add an employee":
        break;
      case "update an employee role":
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
  }, 500);

module.exports = {
  askQuestions,
};
