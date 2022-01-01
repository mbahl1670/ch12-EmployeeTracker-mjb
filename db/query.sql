SELECT emp.id, emp.first_name, emp.last_name, role.title AS job_title, role.salary AS salary, manager.first_name AS manager
FROM employee AS emp
LEFT JOIN employee AS manager ON manager.id = emp.manager_id
JOIN role ON emp.role_id = role.id;
-- JOIN department ON emp.role_id = role.department_id;