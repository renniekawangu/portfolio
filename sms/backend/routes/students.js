const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post('/', async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

module.exports = router;
