const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise"); // Change the import to use the promise version of mysql2

const app = express();
const PORT = 3001;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Diganta@7908",
  database: "comapny_reviews", // Fix typo in the database name (comapny_reviews to company_reviews)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(cors());
app.use(bodyParser.json());

app.post("/api/saveReview", async (req, res) => {
  const { companyName, pros, cons, rating } = req.body;

  try {
    const [existingReview] = await pool
      .promise()
      .query("SELECT * FROM reviews WHERE companyName = ?", [companyName]);

    if (existingReview.length > 0) {
      await pool
        .promise()
        .query(
          "UPDATE reviews SET pros=?, cons=?, rating=? WHERE companyName=?",
          [pros, cons, rating, companyName]
        );
    } else {
      await pool
        .promise()
        .query(
          "INSERT INTO reviews (companyName, pros, cons, rating) VALUES (?, ?, ?, ?)",
          [companyName, pros, cons, rating]
        );
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving or updating review:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Handling HTTP GET request to fetch all reviews
app.get("/api/getReviews", async (req, res) => {
  try {
    // Fetching all reviews from the MySQL database using the pool
    const [rows] = await pool.promise().query("SELECT * FROM reviews");

    // Sending a success response with the fetched reviews
    res.status(200).json(rows);
  } catch (error) {
    // Handling errors by logging and sending an error response
    console.error("Error fetching reviews:", error);
    res.status(500).json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
