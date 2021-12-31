INSERT INTO department
  (name)
VALUES
  ("Sales"),
  ("Accounting"),
  ("HR");

INSERT INTO role
  (title, salary, department_id)
VALUES
  ("Manager", 150000, 1),
  ("Sales Rep", 70000, 1),
  ("Receptionist", 40000, 1),
  ("Head Accountant", 1000000, 2),
  ("Associate Accountant", 85000, 2),
  ("HR Rep", 120000, 3),
  ("Recruiter", 90000, 3);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ("Michael", "Scott", 1, NUll),
  ("Jim", "Halpert", 2, 1),
  ("Dwight", "Schrutte", 2, 1), 
  ("Pam", "Beasley", 3, 1),
  ("Oscar", "Martienz", 4, 1),
  ("Angela", "Ross", 5, 5),
  ("Keith", "Boyle", 5, 5),
  ("Toby", "McGuire", 6, NULL),
  ("Kelly", "Kapour", 7, 8);