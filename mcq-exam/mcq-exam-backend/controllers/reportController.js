const db = require("../config/db");

exports.generateReport = async (req, res) => {
  const { table, filterColumn, filterValue } = req.query;

  if (!table) return res.status(400).json({ error: "Table name is required" });

  let query = `SELECT * FROM ${table}`;
  let params = [];

  if (filterColumn && filterValue) {
    query += ` WHERE ${filterColumn} = ?`;
    params.push(filterValue);
  }

  try {
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error!", details: error.message });
  }
};
