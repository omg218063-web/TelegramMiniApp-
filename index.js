const express = require('express');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const token = '8857813970:AAGvLZHZ5zBYeEr9r5THt5qTNP62TnC3tOU';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(cors());
app.use(express.json());

// ফ্রন্টএন্ড ফাইলগুলো দেখানোর জন্য স্ট্যাটিক ফোল্ডার সেটআপ
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'স্বাগতম! RS Tap to Earn-এ ট্যাপ করে কয়েন আর্ন করুন।', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🚀 অ্যাপ খুলুন',
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
