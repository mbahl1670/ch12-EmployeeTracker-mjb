const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    
    console.log("Database connected.");
    
    
});