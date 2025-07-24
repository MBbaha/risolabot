const mongoose = require('mongoose');

const userBotSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  username: String,
  firstName: String,
  joinedAt: { type: Date, default: Date.now },
  blocked: { type: Boolean, default: false } // 🔥 Bu yer yangi qo‘shildi
});

module.exports = mongoose.model('UserBot', userBotSchema);
