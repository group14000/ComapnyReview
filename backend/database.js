const mysql = require("mysql2/promise");
require("dotenv").config(); // Load environment variables from .env file

// MySQL database credentials
const dbConfig = {
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_DATABASE ,
};

// Function to create a connection to the MySQL database
async function createConnection() {
  return await mysql.createConnection(dbConfig);
}

// Function to close the database connection
async function closeConnection(connection) {
  await connection.end();
}

module.exports = {
  createConnection,
  closeConnection,
};
