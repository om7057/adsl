const db = require("../config/db");

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalStudents] = await db.execute("SELECT COUNT(*) AS total FROM users WHERE role = 'student'");
    const [totalTests] = await db.execute("SELECT COUNT(*) AS total FROM tests");
    const [ongoing] = await db.execute("SELECT COUNT(*) AS total FROM student_attempts WHERE status = 'ongoing'");
    const [terminated] = await db.execute("SELECT COUNT(*) AS total FROM student_attempts WHERE status = 'terminated'");
    const [completed] = await db.execute("SELECT COUNT(*) AS total FROM student_attempts WHERE status = 'completed'");

    res.json({
      totalStudents: totalStudents[0].total,
      totalTests: totalTests[0].total,
      ongoingExams: ongoing[0].total,
      terminatedExams: terminated[0].total,
      completedExams: completed[0].total,
    });
  } catch (error) {
    res.status(500).json({ error: "Database error!", details: error.message });
  }
};
