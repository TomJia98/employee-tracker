SELECT
  departments.name AS department
FROM favorite_books
JOIN book_prices ON favorite_books.book_price = book_prices.id;

SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, employees.manager_id
FROM departments, roles, employees;