const mysql = require('mysql2')
const inquirer = require('inquirer')
require('console.table')

const db = require('./db/connection')
const connection = require('./db/connection')
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
        "Remove a department",
        "Remove a role",
        "Remove an employee",
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
        case "Remove a department":
          removeDepartment();
          break;

        case "Remove a role":
          removeRole();
          break;
        case "Remove an employee":
          removeEmployee();
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

function viewDepartments() {
  db.query('SELECT * FROM department', function (err, res) {
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
function viewEmployees() {
  db.query('SELECT * FROM employees', function (err, res) {
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
const addRole = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Name of role you wish to add:'
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Salary for role:'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Department ID:',
        choices: departments.map(department => ({
          name: `${department.name}`}))
      }
    ])
      .then(function (answers) => {
  db.query('INSERT INTO roles SET ?', {
      title: answers.title,
      salary: answers.salary,
      departmentId: answers.departmentID
    }, err => {
          if (err) throw err;
          console.log('role added')
          start()
        })
      })
  })
}






// function addEmployee() {
//   inquirer.prompt([
//     {
//       name: 'firstName',
//       message: 'First Name:'
//     },
//     {
//       name: 'lastName',
//       message: 'Last Name:'
//     },
//     {
//       name: 'roleId',
//       message: 'Role ID:',
//       type: 'list',
//       choices: res.map(item => item.name)
//     }
//   ]).then(function (answers) {
//     const selectedRole = res.find(role => role.name === answers.roleId)
//     db.query('INSERT INTO employees SET ?', {
//       title: answers.title,
//       salary: answers.salary,
//       roleId: answers.selectedRole
//     }, function (err, res) {
//       if (err) throw err;
//       console.table(res)
//       start()
//     })
//   }
//   )
// }







// function removeEmployee() {
//   connection.query("SELECT * FROM employees", function (err, res) {
//     if (err) throw err;
//     inquirer.prompt([
//       {
//         type: "rawlist",
//         name: "removeEmp",
//         message: "Select the employee who will be removed",
//         choices: res.map(emp => emp.id && emp.first_name)
//       }
//     ]).then(function (answer) {
//       const selectedEmp = res.find(emp => emp.id && emp.first_name === answer.removeEmp);
//       connection.query("DELETE FROM employees WHERE ?",
//         [{
//           id: selectedEmp.id
//         }],
//         function (err, res) {
//           if (err) throw err;
//           console.log("Employee Removed");
//           start();
//         }
//       );
//     });
//   })
// };