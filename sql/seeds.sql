USE employees_db;

INSERT INTO department (name)
VALUES ("engineering"),
       ("not engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("engineer", 80000, 1),
       ("other person", 20000, 2);