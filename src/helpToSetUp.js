import chats from '../chats-to-scrape.json' with { type: 'json' }

const helpToSetUp = () => {
  if(!process.env.API_ID || !process.env.API_HASH) {
    if(!process.env.API_ID) {
      console.log('Please provide API_ID in .env file')
    }
    if(!process.env.API_HASH) {
      console.log('Please provide API_HASH in .env file')
    }
    console.log(`
      Telegram prerequesits

      1. Go to Telegram's API Development Tools: https://my.telegram.org/.

      2. Log in with your phone number (the one you use for Telegram)

      3. Create a New Application
        Click on "API Development Tools"
  
      4. Fill in the Application Form

        App title: Your Parser Bot (or any name)
        Short name: parserbot (short identifier)
        Platform: Web (usually works fine)
        Description: For parsing Telegram channels and messages
        URL: https://yourdomain.com (or any URL, can be placeholder)

      5. Get Your Credentials

      After creation, you'll see:

      api_id - A number like 12345678
      api_hash - A long string like a1b2c3d4e5f6g7h8i9j0

      6. Update Your Environment Variables

      Create .env file in root folder of this project and fill it up with your credentials like this:
      API_ID=12345678
      API_HASH=a1b2c3d4e5f6g7h8i9j0
    `)
    process.exit(1)
  }
  if(!process.env.TOKEN) {
    console.log('Please provide TOKEN in .env file')
    console.log(`
      Set up Telegram bot to receive your filtered (catched) messages to your private channel

      Open Telegram and search for @BotFather

      Start chat and send /newbot

      Choose name for your bot (users will see this)

      Choose username must end with bot (e.g., my_parser_bot)

      Copy the token - it looks like 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

      Add TOKEN to .env file in root folder like this:

      TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

      Also you need to include your bot as an admin to your private channel
    `)
    process.exit(1)
  }
  if(!process.env.CHAT_ID) {
    console.log('Please provide CHAT_ID in .env file')
    console.log(`
      You need to specify your private channel id in .env file to collect all messages (leads).

      The fastest way is to go to browser version of Telegram, login there and open your private channel.
      Copy the id from the url, it starts with - sign, for example: -1001728635215, specify that - as well

      Add CHAT_ID to .env file in root folder like this:
      CHAT_ID=-1001728635215

      Or you can Start chat with your bot

      Send any message to the bot

      Visit this URL in browser:
      https://api.telegram.org/bot<TOKEN>/getUpdates

      In the response you will find your chat id

   `)
    process.exit(1)
  }
  if(!process.env.DEEP_SEEK_TOKEN) {
    console.log('Please provide DEEP_SEEK_TOKEN in .env file')
    console.log(`
      You need to specify your DeepSeek token in .env file to analyze all messages by your prompt.

      Getting DeepSeek API Token

      Go to platform.deepseek.com
      Log in or create account
      Go to API Keys section  
      Click "Create API Key"
      Copy: sk-1234567890abcdef...


      Add DEEP_SEEK_TOKEN to .env file in root folder like this:

      DEEP_SEEK_TOKEN=your_token
    `)
    process.exit(1)
  }
  console.log('All environment variables are set up')
  if(process.argv.length < 3) {
    console.log(`
      Please provide a name for session (better use phone number) as an argument
      to store your session, so you don't need to login again
      Example: node src/index.js +1234567890
      or npm run start 12345678
    `)
    process.exit(1)
  }

  if(chats.length === 0) {
    console.log('Please provide chats to scrape in chats-to-scrape.json file')
    process.exit(1)
  }
  const chatsAvailable = chats.filter(i => /^-\d+$/.test(i))
  if(chatsAvailable.length !== chats.length) {
    console.log('Please provide only valid chats to scrape in chats-to-scrape.json file')
    console.log('Valid chat formats like: -1001728635215')
    console.log('Invalid chats: ', chats.filter(i => !/^-\d+$/.test(i)))
    process.exit(1)
  }
}

export default helpToSetUp