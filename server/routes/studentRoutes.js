const express = require('express');
const {
  createStudent,
  getStudents,
  getStudent, // <- added
  updateStudent,
  deleteStudent,
} = require('../controllers/StudentController');

const router = express.Router();

router.post('/students', createStudent);
router.get('/students', getStudents);
router.get('/students/:id', getStudent); // <- added single-item route
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router;
