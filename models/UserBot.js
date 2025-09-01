const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  firstName: String,
  username: String,
}, { timestamps: true });

module.exports = mongoose.model('UserBot', userSchema);
