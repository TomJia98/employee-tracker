const { askQuestions } = require("./helpers/switchLoop");
//importing the loop that runs the code

afterConnection = () => {
    console.log("***********************************")
    console.log("*                                 *")
    console.log("*        EMPLOYEE MANAGER         *")
    console.log("*                                 *")
    console.log("***********************************")
  };
afterConnection()

askQuestions();