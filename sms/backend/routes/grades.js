const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');

router.get('/', async (req, res) => {
  res.json(await Grade.find());
});

router.post('/', async (req, res) => {
  res.json(await Grade.create(req.body));
});

module.exports = router;
