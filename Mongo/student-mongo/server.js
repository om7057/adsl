require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 📌 MongoDB Connection (Replace with Your PRN-Based Database)
const DB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_22510034";
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// 📌 Define Student Schema & Model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 16 },
    department: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);

// 📌 Get all students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Add a new student
app.post("/students", async (req, res) => {
    try {
        const { name, age, department } = req.body;
        if (!name || !age || !department) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newStudent = new Student({ name, age, department });
        await newStudent.save();
        res.status(201).json({ message: "✅ Student added successfully", student: newStudent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Update a student
app.put("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, department } = req.body;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid student ID" });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, age, department },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "✅ Student updated successfully", student: updatedStudent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Delete a student
app.delete("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid student ID" });
        }

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "✅ Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
