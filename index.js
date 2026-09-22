const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');

const app = express();

// স্ট্যাটিক ফাইল সার্ভ করার জন্য এটি অত্যন্ত জরুরি
app.use(express.static('public'));

app.use(express.json());

// MongoDB কানেকশন
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error: ', err));

// বেসিক রুট
app.get('/', (req, res) => {
  res.send('Telegram Mini App Server is running!');
});

// নতুন ইউজার সেভ করার এপিআই
app.post('/api/users', async (req, res) => {
  try {
    const { telegramId, username, firstName } = req.body;
    let user = await User.findOne({ telegramId });
    if (user) {
      return res.status(200).json({ message: 'User already exists', user });
    }
    user = new User({ telegramId, username, firstName });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// অ্যাডমিন প্যানেলের জন্য ইউজারের তালিকা দেখার এপিআই
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
