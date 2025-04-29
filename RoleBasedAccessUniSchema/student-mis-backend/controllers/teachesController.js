const db = require('../db');

// Get all teaches
exports.getTeaches = (req, res) => {
    db.query('SELECT * FROM teaches', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
