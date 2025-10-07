// these lines are for including commonJS modules in ESM
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config({ path: '.env' })

import login from './login.js'
// function to identify last scrapped message to scrap only new messages from chats
import getLastMessages from './getLastMessages.js'
// import fs from 'fs'
import askAI from './askAI.js'
import chats from '../chats-to-scrape.json' with { type: 'json' }
import sendAMsgToChannel from './sendAMsgToChannel.js'
import helpToSetUp from './helpToSetUp.js'

// extract phone number from command line arguments
const args = process.argv.slice(2)
const phone = args[0]

helpToSetUp()

const client = await login(phone)

if (!phone) {
  console.log('Please provide phone number')
  process.exit(1)
}

for (const chat of chats) {
  console.log('--------------------------------')
  console.log('chat: ', chat)
  const lastMessages = await getLastMessages(client, chat)
  for (let msgObj of lastMessages) {
    // const category = categorizeMsgByCode(msgObj.message)
    // if (category === 'other') {
    //   fs.appendFileSync(
    //     'data-app/not-lead-messages.txt',
    //     msgObj.message + '\n',
    //     { flag: 'a' }
    //   )
    //   continue
    // }
    const res = await askAI(msgObj.message)
    console.log('for this message: ', msgObj.message)
    console.log('result from DeepSeek: ', res)
    if (res === 'true') {
      await sendAMsgToChannel(msgObj)
    }
  }
}

console.log("that's all")

async function main () {}

main()