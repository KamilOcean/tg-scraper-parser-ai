import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config({ path: '.env' })

import formatDate from './utils/formatDate.js'

const CHAT_ID = process.env.CHAT_ID
const TOKEN = process.env.TOKEN

const buildMsg = (lead) => {
  const nicknameMsg = lead.fromId.nickname ? `Nickname: @${lead.fromId.nickname}` : ''
  const firstNameMsg = lead.fromId.firstName ? `Name: ${lead.fromId.firstName}` : ''
  const lastNameMsg = lead.fromId.lastName ? `Lastname: ${lead.fromId.lastName}` : ''
  const nicknameOfChat = lead.chat?.nickname ? `@${lead.chat?.nickname}` : ''
  const titleOfChat = lead.chat?.title ? lead.chat.title : ''
  const phone = lead.fromId.phone ? `Phone: ${lead.fromId.phone}` : ''
  // const msgLink = (lead.msgId && lead.chat?.nickname) ? `Link to the message: https://t.me/${lead.chat?.nickname}/${lead.msgId}` : ''
  // const inviteLink = lead.chat?.inviteLink ? `Invite link: ${lead.chat?.inviteLink}` : ''
  
  const messageText = `
 
  Account id: ${lead.tgId}
  ${nicknameMsg}
  ${firstNameMsg}
  ${lastNameMsg}
  ${phone}
  in the chat ${nicknameOfChat} (${titleOfChat}${lead.chatId ? `, chat id: ${lead.chatId}` : ''}).

Date of message: ${formatDate(lead.date)}

Content: <strong>${
    lead.message
}</strong>
`
  return messageText
}

async function sendAMsgToChannel(lead) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: buildMsg(lead),
        parse_mode: 'HTML'
      })
    })
    const res = await response.json()
    if(!res.ok) {
      console.error('Error: ', res)
      return
    }
    
    console.log('success of sending lead: ', lead)
  } catch(err) {
    console.error('Error: ', err)
  }
}

export default sendAMsgToChannel