
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

// আপনার বটের আসল টোকেন
const token = '8857813970:AAGvLZHZ5zBYeEr9r5THt5qTNP62TnC3tOU';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(cors());
app.use(express.json());

// বেসিক রুট
app.get('/', (req, res) => {
  res.send('RS Tap to Earn Backend is running successfully!');
});

// বটের মেসেজ হ্যান্ডলার
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'হ্যালো! RS Tap to Earn এ আপনাকে স্বাগতম। ট্যাপ করে কয়েন আর্ন করতে নিচের বাটনে ক্লিক করুন:', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🚀 অ্যাপ খুলুন (Open App)',
              web_app: { url: 'https://telegramminiapp-45v1.onrender.com' }
            }
          ]
        ]
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
