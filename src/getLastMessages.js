// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)
// const { Api } = require('telegram')
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import chatsMeta from '../chats-meta.json' with { type: 'json' }

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getLastMessages = async (client, chat_id) => {
  
  const chat = chatsMeta.find(chat => chat.tgId === chat_id)

  let lastMessageId = chat?.lastMessageId
  let limit = 30

  const result = []

  let firstMessageId = null

  try {
    let topicId = null
    let params = {}
    if(chat?.tgId?.includes('_')) {
      topicId = parseInt(chat.tgId.split('_')[1])
      chat.tgId = chat.tgId.split('_')[0]
      params.replyTo = topicId
    }
    for await (const message of client.iterMessages(chat ? chat.tgId : chat_id, params)) {
      if(!firstMessageId) firstMessageId = message.id
        limit--
        if(limit <= 0 || (lastMessageId && message.id === lastMessageId)) {
          if(chat) {
            chat.lastMessageId = firstMessageId
          } else {
            chatsMeta.push({
              tgId: chat_id,
              lastMessageId: firstMessageId
            })
          }
          const filePath = path.resolve(__dirname, '../chats-meta.json')
          fs.writeFileSync(filePath, JSON.stringify(chatsMeta, null, 2), { flag: 'w' })
          break
        }
        console.log(`rest messages from the chat ${chat_id}: `, limit)
        if(!message || !message.message) continue
        await new Promise(r => setTimeout(r, 2000))
        result.push(message)
    }
    return result
  } catch (err) {
    console.error('Error: ', err)
    return result
  }
}

export default getLastMessages
