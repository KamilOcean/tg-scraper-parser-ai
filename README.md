# Telegram Scraper + Parser + AI Analyzer
## 🤖 Crypto Intelligence Engine

**Languages:** [English](README.md) | [Russian](README_RU.md)

> **Real-time Telegram scraping + AI analysis for crypto market insights**

Scrape thousands of Telegram channels, filter signals from noise, and get AI-powered crypto intelligence delivered in real-time. Perfect for traders, analysts, and crypto enthusiasts drowning in information overload.
Includes saved sessions — no need to log in each time.

> You can also use it for other purposes, not only crypto!

## How it works

1. Set up this project with your Telegram bot and AI service.
2. Specify which chats and channels you want to process.
3. Configure your AI service to analyze all messages.
4. Set up your private channel to receive filtered messages.
5. Run the project and get real-time alerts in your private Telegram channel.

👉 **Follow me on LinkedIn**: [in/kamil-ocean/](https://www.linkedin.com/in/kamil-ocean/)

## 🚀 What This Solves

**"90% of alpha is hidden in Telegram - we help you find it"**

- **Information Overload**: Too many channels, too little time
- **Signal vs Noise**: Separate valuable insights from spam
- **Real-time Alerts**: Never miss important market movements
- **AI-Powered Analysis**: Smart filtering beyond simple keywords

## 💡 Perfect For

- **Crypto traders** wanting edge through Telegram intelligence
- **Fund managers** monitoring market sentiment
- **Researchers** analyzing crypto community trends
- **Project teams** tracking their mentions and competitors

## Installation & Setup

> Requires NodeJS installed on your computer

1. Install dependencies
```bash
npm install
```

2. Telegram prerequisites

  1. Go to [Telegram's API Development Tools](https://my.telegram.org/).

  2. Log in with your phone number (the one you use for Telegram)

  3. Create a New Application
    Click on "API Development Tools"
  
  4. Fill in the Application Form

  ```text
    App title: Your Parser Bot (or any name)
    Short name: parserbot (short identifier)
    Platform: Web (usually works fine)
    Description: For parsing Telegram channels and messages
    URL: https://yourdomain.com (or any URL, can be placeholder)
  ```

  5. Get Your Credentials

    After creation, you'll see:

      api_id - A number like 12345678
      api_hash - A long string like a1b2c3d4e5f6g7h8i9j0

3. Update Your Environment Variables

Create `.env` file in root folder of this project and fill it up with your credentials like this:

```bash
API_ID=12345678
API_HASH=a1b2c3d4e5f6g7h8i9j0
```

5. Edit `chats-to-scrape.json` with your target chats/channels.
**IMPORTANT! You must manually join these chats first.**
**IMPORTANT! You must manually join these chats first. (you can get it from the browser, go to the chat in browser and copy the id from the url, it starts with - sign, for example: -1001728635215, specify that - as well)**

```chats-to-scrape.json
[
  "-1001728635215", // not usernames, ids
  "-1001728635216"
]
```

6. Fill the 'ai-settings.json' file with your prompt and settings for your AI service.

> **IMPORTANT!**
> For now only DeepSeek is available. You also need to have an API key for DeepSeek and fill it up in the .env file. like this: DEEP_SEEK_TOKEN=your_token
> 

```ai-settings.json
{
  "prompt": "Your prompt",
  "model": "deepseek-chat",
  "max_tokens": 100,
  "temperature": 0.7
}
```

7. Set up Telegram bot to receive your filtered (catched) messages to your private channel

Open Telegram and search for @BotFather

Start chat and send /newbot

Choose name for your bot (users will see this)

Choose username must end with bot (e.g., my_parser_bot)

Copy the token - it looks like 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

Add `TOKEN` to `.env` file in root folder like this:

```bash
TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
```

8. You need to specify your private channel id in .env file to collect all messages (leads).

The fastest way is to go to browser version of Telegram, login there and open your private channel.
Copy the id from the url, it starts with - sign, for example: -1001728635215, specify that - as well
Your bot should be added as an admin to your private channel!

Add CHAT_ID to .env file in root folder like this:
CHAT_ID=-1001728635215

Or you can Start chat with your bot

Send any message to the bot

Visit this URL in browser:
https://api.telegram.org/bot<TOKEN>/getUpdates

In the response you will find your chat id

9. Getting DeepSeek API Token

Go to [platform.deepseek.com](platform.deepseek.com)
Log in or create account
Go to API Keys section  
Click "Create API Key"
Copy: sk-1234567890abcdef...


Add `DEEP_SEEK_TOKEN` to `.env` file in root folder like this:

```bash
DEEP_SEEK_TOKEN=your_token
```

10. Run tg-scraper-parser-ai
```bash
npm run start <phone>
```

or

```bash
node src/index.js <phone>
```


## 🚀 Ready for Production?

This demo shows basic message iteration. It works well if you're just testing it out or you're a solo trader. But for a production system you'll need:

✅ **Database integration** for message storage
✅ **Advanced AI analysis** for intelligent filtering  
✅ **Multi-account management** to avoid limits
✅ **Real-time processing** for instant alerts
✅ **Scalable architecture** for multiple channels
✅ **Custom Development** - Tailored to your specific needs 

## 🤝 Let's Build Together!

**Need help setting this up? Want the tailored solution with some interface?**

I specialize in building custom crypto intelligence systems. Feel free to:

👉 **DM me on LinkedIn**: [in/kamil-ocean/](https://www.linkedin.com/in/kamil-ocean/)

I'm happy to help you set up the project locally or in hosting service, discuss custom features, or even build a complete enterprise solution for your specific needs!
