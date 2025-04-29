const db = require('../db');

// Get all takes (student-course relationships)
exports.getTakes = (req, res) => {
    db.query('SELECT * FROM takes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
