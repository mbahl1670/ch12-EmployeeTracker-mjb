SELECT emp.id, emp.first_name, emp.last_name, role.title AS job_title, department.name AS department, role.salary AS salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
FROM employee AS emp
LEFT JOIN employee AS manager ON manager.id = emp.manager_id
JOIN role ON emp.role_id = role.id
LEFT JOIN department ON role.department_id = department.id;