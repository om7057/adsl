const db = require('../db');

// Get all students
exports.getStudents = (req, res) => {
    db.query('SELECT * FROM student', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Create a new student
exports.createStudent = (req, res) => {
    const { name, dept_name, tot_cred } = req.body;
    db.query('INSERT INTO student (name, dept_name, tot_cred) VALUES (?, ?, ?)', 
    [name, dept_name, tot_cred], 
    (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student Added' });
    });
};

// Delete a student
exports.deleteStudent = (req, res) => {
    db.query('DELETE FROM student WHERE ID = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student Deleted' });
    });
};
