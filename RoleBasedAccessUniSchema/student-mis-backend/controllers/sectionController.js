const db = require('../db');

// Get all sections
exports.getSections = (req, res) => {
    db.query('SELECT * FROM section', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
