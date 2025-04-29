const express = require("express");
const cors = require("cors");
const { Client } = require("cassandra-driver");  // Import Cassandra client
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors()); // Allow cross-origin requests from Angular frontend
app.use(express.json());

// Astra DB Details
const ASTRA_DB_CLIENT_ID = "jUmZYXgbFNACyOfMzZWfldvX";  // Astra DB Client ID
const ASTRA_DB_CLIENT_SECRET = "lx,.GCeziXjBF_aNlbi4_QpM1i0IioFZhXEYpefuiCN1SCGyeMeHbas3RjK4FjLb_FawZTB5awydb,N1Z+P9AJUp26pPRLISrx1oRHww3mqsYUvEmUw68HNH,MYT9.80";  // Astra DB Client Secret
const ASTRA_DB_KEYSPACE = '"22510034"';  // Ensure it's quoted if it has special characters
const ASTRA_DB_TABLE = '"students"';  // Ensure it's quoted if it has special characters

// Create a Cassandra client
const client = new Client({
  cloud: { 
    secureConnectBundle: "D:\\Academics\\0TY\\Labs\\Sem-VI\\ADSL\\22510034_Assignment09\\student-cassandra\\secure-connect-db.zip"  // Path to your secure-connect-bundle.zip
  },  
  credentials: { 
    username: ASTRA_DB_CLIENT_ID, 
    password: ASTRA_DB_CLIENT_SECRET 
  },
});

client.connect()
  .then(() => console.log("Connected to Astra DB"))
  .catch((error) => console.error("Connection error", error));

// GET students
app.get("/students", async (req, res) => {
  try {
    const query = `SELECT * FROM ${ASTRA_DB_KEYSPACE}.${ASTRA_DB_TABLE};`;  // Fixed query syntax with quotes
    const result = await client.execute(query);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching students:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST student
app.post("/students", async (req, res) => {
  const { name, age, department } = req.body;

  if (!name || !age || !department) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const id = uuidv4();

  try {
    const query = `INSERT INTO ${ASTRA_DB_KEYSPACE}.${ASTRA_DB_TABLE} (id, name, age, department) VALUES (?, ?, ?, ?);`;  // Fixed query syntax with quotes
    await client.execute(query, [id, name, age, department], { prepare: true });
    res.status(201).json({ message: "Student added", student: { id, name, age, department } });
  } catch (error) {
    console.error("❌ Error adding student:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// PUT update student
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, department } = req.body;

  try {
    const query = `UPDATE ${ASTRA_DB_KEYSPACE}.${ASTRA_DB_TABLE} SET name = ?, age = ?, department = ? WHERE id = ?;`;  // Fixed query syntax with quotes
    await client.execute(query, [name, age, department, id], { prepare: true });
    res.json({ message: "Student updated" });
  } catch (error) {
    console.error("❌ Error updating student:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `DELETE FROM ${ASTRA_DB_KEYSPACE}.${ASTRA_DB_TABLE} WHERE id = ?;`;  // Fixed query syntax with quotes
    await client.execute(query, [id], { prepare: true });
    res.json({ message: "Student deleted" });
  } catch (error) {
    console.error("❌ Error deleting student:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
