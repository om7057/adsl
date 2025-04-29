const db = require("../config/db");

exports.addQuestion = async (req, res) => {
  const { course_id, created_by, question_text, image_url, difficulty } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO questions (course_id, created_by, question_text, image_url, difficulty) VALUES (?, ?, ?, ?, ?)",
      [course_id, created_by, question_text, image_url, difficulty]
    );
    res.status(201).json({ message: "Question added successfully!", questionId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Database error!" });
  }
};


exports.getQuestions = async (req, res) => {
  try {
    const [questions] = await db.execute("SELECT * FROM questions");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Database error!" });
  }
};
