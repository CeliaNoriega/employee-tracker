const util = require("util");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "Corgi900!",
  database: "employees_db"
});
connection.connect();
// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);
module.exports = connection;