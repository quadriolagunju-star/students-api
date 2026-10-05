
const express = require("express");

const app = express();
app.use(express.json());

// In-memory "database"
let students = [];
let nextId = 1;

// Add a new student
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || age === undefined || !course) {
    return res
      .status(400)
      .json({ message: "name, age and course are required" });
  }

  const student = { id: nextId++, name, age, course };
  students.push(student);
  res.status(201).json(student);
});

// Get all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// Get a student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json(student);
});

// Update student information
app.put("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, age, course } = req.body;
  if (name !== undefined) student.name = name;
  if (age !== undefined) student.age = age;
  if (course !== undefined) student.course = course;

  res.status(200).json(student);
});

// Delete a student
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const [deleted] = students.splice(index, 1);
  res.status(200).json({ message: "Student deleted", student: deleted });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));