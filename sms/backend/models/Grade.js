
const mongoose = require('mongoose');
module.exports = mongoose.model('Grade', new mongoose.Schema({
  student:String,course:String,grade:String
}));
