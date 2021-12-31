const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    
    console.log(`Employee Database Connected`);
    
    commandPrompt();
});

function commandPrompt() {

    return inquirer.prompt({
        type: "list",
        name: "command",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Quit/End program"
        ],
        loop: false
    })
    .then(command => {
        switch (command.command) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateEmployee();
                break;
            case "Quit/End program":
                console.log(`Thank You!  Good Bye!`);
                db.end();
                break;
        }
    });
};

function viewDepartments() {console.log("1"); commandPrompt();};
function viewRoles() {console.log("2"); commandPrompt();};
function viewEmployees() {console.log("3"); commandPrompt();};
function addDepartment() {console.log("4"); commandPrompt();};
function addRole() {console.log("5"); commandPrompt();};
function addEmployee() {console.log("6"); commandPrompt();};
function updateEmployee() {console.log("7"); commandPrompt();};