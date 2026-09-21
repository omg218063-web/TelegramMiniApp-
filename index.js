
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

// আপনার টেলিগ্রাম বটের টোকেন এখানে বসাবেন
const token = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(cors());
app.use(express.json());

// বেসিক রুট
app.get('/', (req, res) => {
  sendResponse(res, { status: 'Telegram Mini App Backend is running successfully!' });
});

// বটের মেসেজ হ্যান্ডলার
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'হ্যালো! আমাদের টেলিগ্রাম মিনি অ্যাপে আপনাকে স্বাগতম।', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'অ্যাপ খুলুন (Open App)',
              web_app: { url: 'https://your-frontend-url.com' }
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
        
