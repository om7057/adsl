const db = require('../db');
const bcrypt = require('bcryptjs');

exports.getUsers = (req, res) => {
    db.query('SELECT id, username, role FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addUser = (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'User added successfully' });
        }
    );
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted successfully' });
    });
};
