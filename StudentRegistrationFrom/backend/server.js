const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if needed
  password: "Om7249@123", // Change if needed
  database: "student_dbii",
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// 📌 Get all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// 📌 Add a new student
app.post("/students", (req, res) => {
  const { name, age, department } = req.body;

  if(!name || !age || !department) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = 'INSERT INTO students (name, age, department) VALUES (?, ?, ?)';
  db.query(sql, [name, age, department], (err, result) => {
      if (err) {
          console.error('Error inserting student:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Student added successfully', studentId: result.insertId });
  });
});

// 📌 Update student name
app.put("/students/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, department } = req.body;  // ✅ Get all fields
  
    const sql = "UPDATE students SET name = ?, age = ?, department = ? WHERE id = ?";
    db.query(sql, [name, age, department, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Student updated successfully!" });
    });
  });
  

// 📌 Delete a student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Student deleted successfully!" });
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
