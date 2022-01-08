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
                updateEmployeeRole();
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

function addDepartment() {
        
    inquirer.prompt({
        type: "input",
        name: "departmentName",
        message: "What is the name of the new department?",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter a department name.")
            }
        }
    })
    .then(departmentInfo => {
        const sql = `INSERT INTO department (name) VALUES (?);`;
        const params = [departmentInfo.departmentName];
        db.query(sql, params, (err, res) => {
            if(err) {
                throw err;
            }
            console.log(`\n\n
****************************************************
    Adding Department ${departmentInfo.departmentName}
****************************************************\n`);
            commandPrompt();
        });
    });
};

function addRole() {
// code for this function was developed with the help of Greg L from class.  
// Chaining the inquirer prompts with .then statments was necessary 
// Defining the params variable earlier in the function and adding info to it with push was borrowed from his code.

    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the title of the new role?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the title of the new role.")
                }
            }
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the new role?",
            validate: value => {
                if (value) {
                    return true;
                } else {
                    console.log("Please enter the salary of the new role.")
                }
            }
        }
    ])
    .then (roleInfo => {
        const params = [roleInfo.roleTitle, roleInfo.roleSalary];
        const roleSql = `SELECT * FROM department`;

        db.query(roleSql, (err, res) => {
            if (err) {
                throw err;
            }
            // console.log(res);
            // const departmentChoices = res;
            const departmentChoices = res.map(({ name, id }) => ({name: name, value: id}));
            // console.log(departmentChoices);
            inquirer.prompt([
                {
                    type: "list",
                    name: "departmentID",
                    message: "What is the department of the new role?",
                    choices: departmentChoices
                }
            ])
            .then(roleInfo => {
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;
                params.push(roleInfo.departmentID);
                
                db.query(sql, params, (err, res) => {
                    if(err) {
                        throw err;
                    }
                    console.log(`\n\n
****************************************************
            Adding Role ${params[0]}
****************************************************\n`);
                    commandPrompt();

                });    
            });
        });
    });
};

function addEmployee() {

    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the new employee?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the first name of the new employee.")
                }
            }
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the new employee?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the last name of the new employee.")
                }
            }
        }
    ])
    .then(employeeInfo => {
        const roleSql = `SELECT * FROM role`;
        const params = [employeeInfo.firstName, employeeInfo.lastName];

        db.query(roleSql, (err, res) => {
            if (err) {
                throw err;
            }
            const roleChoices = res.map(({ title, id}) => ({ name: title, value: id}));

            inquirer.prompt([
                {
                    type: "list",
                    name: "roleID",
                    message: "What is the title of the new employee?",
                    choices: roleChoices,
                    loop: false
                }
            ])
            .then(employeeInfo => {
                const managerSql = `SELECT * FROM employee`;
                params.push(employeeInfo.roleID);
                
                db.query(managerSql, (err, res) => {
                    if (err) {
                        throw err;
                    }

                    const managerChoices = res.map(({ first_name, last_name, id }) => ({ name: first_name + " " + last_name, value: id  }));
                    const noManager = {
                            name: null,
                            value: null
                        };
                    managerChoices.push(noManager);

                    inquirer.prompt([
                        {
                            type: "list",
                            name: "managerID",
                            message: "Who is the new employee's manager?",
                            choices: managerChoices,
                            loop: false
                        }
                    ])
                    .then(employeeInfo => {
                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
                        params.push(employeeInfo.managerID);

                        db.query(sql, params, (err, res) => {
                            if(err) {
                                throw err;
                            }
                            console.log(`\n\n
****************************************************
    Adding Employee ${params[0]} ${params[1]}
****************************************************\n`);
                            commandPrompt();
                        });
                    });
                });
            });
        });
    });
};

function updateEmployeeRole() {
    const employeeSql = `SELECT * FROM employee`;

    db.query(employeeSql, (err, res) => {
        if(err) {
            throw err;
        }
        const employeeChoices = res.map(({ first_name, last_name, id }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'selectedEmployee',
                message:  'Which employee will change roles?',
                choices: employeeChoices,
                loop: false
            }
        ])
        .then(employeeInfo => {
            // thinking of the order we will need to use this info, assigning the result of our employee choice to a variable, planning to add it to the parameter (params) array later
            chosenEmployee = employeeInfo.selectedEmployee;
            roleSql = `SELECT * FROM role`;

            db.query(roleSql, (err, res) => {
                if (err) {
                    throw err;
                }

                const roleChoices = res.map(({ title, id }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'selectedRole',
                        message: "What is the employee's new role?",
                        choices: roleChoices,
                        loop: false
                    }
                ])
                .then(roleInfo => {
                    const params = [roleInfo.selectedRole];
                    params.push(chosenEmployee);
                    
                    sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                    db.query(sql, params, (err, res) => {
                        if (err) {
                            throw err;
                        }   
                        
                        console.log(`\n\n
****************************************************
            Employee has been updated
****************************************************\n`);
                        commandPrompt();
                    });
                });
            });
        });
    });
};