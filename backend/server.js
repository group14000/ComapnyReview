const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());

// Replace these with your MySQL database credentials
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Diganta@7908",
  database: "Company_Reviews",
};

app.use(express.json());

app.post("/api/saveReview", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const { companyName, pros, cons, rating } = req.body;

    // Insert the data into the MySQL database
    await connection.execute(
      "INSERT INTO reviews (companyName, pros, cons, rating) VALUES (?, ?, ?, ?)",
      [companyName, pros, cons, rating]
    );

    // Close the database connection
    await connection.end();

    res
      .status(200)
      .json({ success: true, message: "Review saved successfully" });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/getReviews", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Fetch all reviews from the MySQL database
    const [rows] = await connection.execute("SELECT * FROM reviews");

    // Close the database connection
    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json([]);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
