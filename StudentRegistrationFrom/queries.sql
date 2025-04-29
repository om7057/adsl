-- 1. Create a new database
CREATE DATABASE IF NOT EXISTS student_dbii;

-- 2. Use the new database
USE student_dbii;

-- 3. Create the students table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    department VARCHAR(100) NOT NULL
);
