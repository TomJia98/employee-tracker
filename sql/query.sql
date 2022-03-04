USE employees_db;

SELECT roles.department_id, department.name
FROM roles 
INNER JOIN department
ON roles.department_id = department.id;