const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");
const res = require('express/lib/response');


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

function viewDepartments() {
    const sql = `SELECT name, id FROM department`;

    db.query(sql, (err, res) => {
        if(err) {
            throw err;
        }
        console.log("\n\nShowing Department names & Department ID's\n");
        console.table(res);
    });

    commandPrompt();
};

function viewRoles() {
    const sql = `SELECT title, role.id, department.name AS department, salary 
                 FROM role 
                 JOIN department ON role.department_id = department.id;`;

    db.query(sql, (err, res) => {
        if(err) {
            throw err;
        }
        console.log("\n\nShowing Role Title, ID, Department and Salary\n");
        console.table(res);
    });

    commandPrompt();
};

function viewEmployees() {
    const sql = `SELECT emp.id, emp.first_name, emp.last_name, role.title AS job_title, 
                    department.name AS department, role.salary AS salary, 
                    CONCAT(manager.first_name, " ", manager.last_name) AS manager 
                FROM employee AS emp 
                LEFT JOIN employee AS manager ON manager.id = emp.manager_id 
                JOIN role ON emp.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id;`

    db.query(sql, (err, res) => {
        if(err) {
            throw err;
        }
        console.log("\n\nShowing Employee ID, First Name, Last Name, Job Title, Salary and Manager\n");
        console.table(res);
    });

    commandPrompt();
};

function addDepartment() {console.log("4"); commandPrompt();};
function addRole() {console.log("5"); commandPrompt();};
function addEmployee() {console.log("6"); commandPrompt();};
function updateEmployee() {console.log("7"); commandPrompt();};