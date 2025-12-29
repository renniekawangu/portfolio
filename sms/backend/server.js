
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/grades', require('./routes/grades'));
//app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/csv', require('./routes/csv'));

app.listen(5000, ()=>console.log("Server running on 5000"));
