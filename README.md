# Employee Tracker - Challenge #12 in the U of MN Bootcamp

## Built With
* Node.js
* NPM Inquirer
* SQL/mysql2
* console.table

## Description
This is a Node.js application for tracking employee information.  Including department, job title, and manager.  Information is being stored and accessed using SQL database

## Table of Contents
* [Acceptance Criteria](#acceptance-criteria)
* [Walkthrough Vido](#walkthrough-video)
* [Screenshot of the Application](#screenshot-of-the-application)
* [Git Repository](#git-repository)
* [How this was accomplished](#how-this-was-accomplished)

## Acceptance Criteria
* When you start the app you are presented with a menu with options: 
  * view all departments 
  * view all roles 
  * view all employees 
  * add a department 
  * add a role 
  * add an employee 
  * update an employee role
* When you view all departments you see a formatted table showing: 
  * department names
  * department ids
* When you view all roles you are see a formatted table showing:
  * job title 
  * role id 
  * the department that role belongs to 
  * the salary for that role
* When you view all employees you see a formatted table showing:
  * employee ids 
  * first names 
  * last names 
  * job titles 
  * department 
  * salary
  * managers that the employee reports to
* When you add a department you are prompted to enter the name of the department and it is added to the database
* When you add a role you are prompted to enter the name of the role, the salary and the department for that role, and all this is added to the database
* When you add an employee you are prompted to enter the employee's first name, last name, role and the manager they report to; this is all added to the database
* When you update an employee's role you are promped to select an employee and what the employee's new role is and this info is updated in the database

## Walkthrough Video
https://watch.screencastify.com/v/7LttodzBPWnOqDvqJyr3

## Screenshot of the Application
![Screenshot (45)](https://user-images.githubusercontent.com/90292697/148703718-12b00aa5-09df-45d7-a5b0-d8a20a156be1.png)

## Git Repository
https://github.com/mbahl1670/ch12-employeeTracker-mjb


## How this was accomplished
* Wrote .sql files to establish to create the database, tables with their columns, and add seed data to the tables to be able to further develop the app
* Created the connection.js file to use mysql2 to connect to the SQL database
* Started the index.js file, establishes a connection to the database then calls a function for the opening menu ( commandPrompt() )
* The commandPrompt() function is an inquirer prompt that lists all the functions required for to meet the acceptacec critera
* Wrote each of the functions that is called when selecting from the list made with the commandPrompt() function
* The view statements involved writing database queries and figuring out the JOIN statments required to see the required information
  * Viewing employees proved to be the most difficult with multiple JOIN statments
* The ADD functions required using inquirier prompts to collect information that needed to be passed into SQL and using prepared SQL statements
  * This proved to be the most difficult part of the challenge, help was required from classmates [shout out to Greg L for the help here], and tutor's to figure this out
  * Attempted to utilize async/await functions here, was unable to figure this out.  Instead, chained promises using .then() statements
  * The use of .map method was required to translate information returned from a database query into information that was easily utilized by the inquirer.prompt
* Final part of the challenge was updating an employee, after figuring out how to utilize and map the information collected from a database query, this was not nearly as difficult
