const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { Parser } = require('json2csv');

router.get('/export', async (req, res) => {
  const students = await Student.find().lean();
  const parser = new Parser();
  const csv = parser.parse(students);

  res.header('Content-Type', 'text/csv');
  res.attachment('students.csv');
  res.send(csv);
});

router.post('/import', async (req, res) => {
  await Student.insertMany(req.body);
  res.json({ message: 'Imported successfully' });
});

module.exports = router;
