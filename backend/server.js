const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3001;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Diganta@7908",
  database: "comapny_reviews",
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

app.get("/api/getReviews", async (req, res) => {
  try {
    const [reviews] = await pool.promise().query("SELECT * FROM reviews");

    // Check if reviews exist
    if (reviews.length > 0) {
      res.status(200).json({ success: true, data: reviews });
    } else {
      res.status(404).json({ success: false, message: "No reviews found" });
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
