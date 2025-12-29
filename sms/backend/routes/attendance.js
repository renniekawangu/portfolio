const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
  res.json(await Attendance.find());
});

router.post('/', async (req, res) => {
  res.json(await Attendance.create(req.body));
});

module.exports = router;