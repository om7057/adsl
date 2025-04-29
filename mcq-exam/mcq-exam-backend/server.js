require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/reports", require("./routes/reportRoutes")); // Added Reports API
app.use("/api/dashboard", require("./routes/dashboardRoutes")); // Added Dashboard API

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
