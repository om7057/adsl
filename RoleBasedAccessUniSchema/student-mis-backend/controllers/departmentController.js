const db = require('../db');

exports.getDepartments = (req, res) => {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addDepartment = (req, res) => {
    const { dept_name, building, budget } = req.body;
    if (budget <= 0) return res.status(400).json({ error: 'Budget must be greater than zero.' });

    db.query('INSERT INTO department (dept_name, building, budget) VALUES (?, ?, ?)', [dept_name, building, budget], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Department added successfully', id: result.insertId });
    });
};

exports.updateDepartment = (req, res) => {
    const { dept_name } = req.params;
    const { building, budget } = req.body;
    if (budget <= 0) return res.status(400).json({ error: 'Budget must be greater than zero.' });

    db.query('UPDATE department SET building = ?, budget = ? WHERE dept_name = ?', [building, budget, dept_name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Department updated successfully' });
    });
};

exports.deleteDepartment = (req, res) => {
    const { dept_name } = req.params;
    db.query('DELETE FROM department WHERE dept_name = ?', [dept_name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Department deleted successfully' });
    });
};
