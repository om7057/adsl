const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );
    res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Database error!" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Database error!" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const [users] = await db.execute("SELECT id, name, email, role FROM users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Database error!" });
  }
};
