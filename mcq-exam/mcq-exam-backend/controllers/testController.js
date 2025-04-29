const db = require("../config/db");

exports.createTest = async (req, res) => {
  const { name, course_id, created_by, start_time, time_limit } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO tests (name, course_id, created_by, start_time, time_limit) VALUES (?, ?, ?, ?, ?)",
      [name, course_id, created_by, start_time, time_limit]
    );
    res.status(201).json({ message: "Test created successfully!", testId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Database error!" });
  }
};

exports.getTests = async (req, res) => {
  try {
    const [tests] = await db.execute("SELECT * FROM tests");
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: "Database error!" });
  }
};
