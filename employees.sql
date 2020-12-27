CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    departmentId INT UNSIGNED NOT NULL,
    FOREIGN KEY (departmentId) REFERENCES departments(id)
);

CREATE TABLE employees (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT UNSIGNED NOT NULL,
    managerId INT UNSIGNED,
    FOREIGN KEY(roleId) REFERENCES roles(id),
    FOREIGN KEY(managerId) REFERENCES employees(id)
);

USE employees_db;

INSERT INTO departments
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles
    (title, salary, departmentId)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employees
    (firstName, lastName, roleId, managerId)
VALUES
    