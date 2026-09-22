const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  balance: { type: Number, default: 0 }, // ট্যাপ-টু-আর্ন কয়েন বা ব্যালেন্স
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
