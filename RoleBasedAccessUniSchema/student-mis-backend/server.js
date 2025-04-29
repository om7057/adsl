require('dotenv').config();
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/students');
const departmentRoutes = require('./routes/departments');
const courseRoutes = require('./routes/courses');
const instructorRoutes = require('./routes/instructors');
const sectionRoutes = require('./routes/sections');
const takesRoutes = require('./routes/takes');
const teachesRoutes = require('./routes/teaches');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/students', studentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/takes', takesRoutes);
app.use('/api/teaches', teachesRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));