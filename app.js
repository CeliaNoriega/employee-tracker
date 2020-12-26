const mysql = require('mysql2')
const inquirer = require('inquirer')
require('console.table')

const db = require('./db/connection')
start()
function start() {
  inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "Remove an employee",
        "Remove a role",
        "Remove a department",
        "Update employee roles",
        "View the total utilized budget of a department",
        "Exit"
      ]
    }])
    .then(function (answer) {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Remove an employee":
          removeEmployee();
          break;
        case "Remove a role":
          removeRole();
          break;
        case "Remove a department":
          removeDepartment();
          break;
        case "Update employee roles":
          selectEmp();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
};

function viewEmployees() {
  db.query('SELECT * FROM employees', function (err, res) {
    if (err) throw err;
    console.table(res)
    start()
  })
}

function viewRoles() {
  db.query('SELECT * FROM roles', function (err, res) {
    if (err) throw err;
    console.table(res)
    start()
  })
}

function viewDepartments() {
  db.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res)
    start()
  })
}

function addDepartment() {
  inquirer.prompt([
    {
      name: 'addDepartment',
      message: 'Name of Department you wish to add:'
    }
  ]).then(function (answer) {
    db.query('INSERT INTO departments SET ?', {
      name: answer.addDepartment
    }, function (err, res) {
      if (err) throw err;
      console.table(res)
      start()
    })
  }
  )
}

function addRole() {
  inquirer.prompt([
    {
      name: 'title',
      message: 'Name of role you wish to add:'
    },
    {
      name: 'salary',
      message: 'Salary for role:'
    },
    {
      name: 'departmentId',
      message: 'Department ID:',
      type: 'list',
      choices: res.map(item => item.name)
    }
  ]).then(function (answers) {
    const selectedDept = res.find(dept => dept.name === answers.departmentId)
    db.query('INSERT INTO roles SET ?', {
      title: answers.title,
      salary: answers.salary,
      departmentId: answers.selectedDept
    }, function (err, res) {
      if (err) throw err;
      console.table(res)
      start()
    })
  }
  )
}