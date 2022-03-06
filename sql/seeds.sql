USE employees_database;

INSERT INTO departments (name)
VALUES ("engineering"),
       ("not engineering");

INSERT INTO roles (title, salary, department_id)
VALUES ("engineer", 80000, 1),
       ("other person", 20000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("geoff", "jefferson", 1, NULL),
       ("parchment", "apsye", 2, 1);