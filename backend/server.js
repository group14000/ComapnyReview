// Importing required modules
const express = require("express");
const mysql = require("mysql2/promise");

// Creating an instance of the Express application
const app = express();
const port = 3001;

// Adding Cross-Origin Resource Sharing (CORS) middleware to the application
const cors = require("cors");
app.use(cors());

// MySQL database credentials
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Diganta@7908",
  database: "Company_Reviews",
};

// Parsing incoming JSON requests
app.use(express.json());

// Handling HTTP POST request to save a review
app.post("/api/saveReview", async (req, res) => {
  try {
    // Creating a connection to the MySQL database
    const connection = await mysql.createConnection(dbConfig);

    // Extracting review details from the request body
    const { companyName, pros, cons, rating } = req.body;

    // Inserting the data into the MySQL database
    await connection.execute(
      "INSERT INTO reviews (companyName, pros, cons, rating) VALUES (?, ?, ?, ?)",
      [companyName, pros, cons, rating]
    );

    // Closing the database connection
    await connection.end();

    // Sending a success response with a JSON message
    res
      .status(200)
      .json({ success: true, message: "Review saved successfully" });
  } catch (error) {
    // Handling errors by logging and sending an error response
    console.error("Error saving review:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Handling HTTP GET request to fetch all reviews
app.get("/api/getReviews", async (req, res) => {
  try {
    // Creating a connection to the MySQL database
    const connection = await mysql.createConnection(dbConfig);

    // Fetching all reviews from the MySQL database
    const [rows] = await connection.execute("SELECT * FROM reviews");

    // Closing the database connection
    await connection.end();

    // Sending a success response with the fetched reviews
    res.status(200).json(rows);
  } catch (error) {
    // Handling errors by logging and sending an error response
    console.error("Error fetching reviews:", error);
    res.status(500).json([]);
  }
});

// Starting the Express server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
