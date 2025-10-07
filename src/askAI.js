import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config({ path: '.env' })

import aiSettings from '../ai-settings.json' with { type: 'json' }

const DEEP_SEEK_TOKEN = process.env.DEEP_SEEK_TOKEN

const askAI = async (msg) => {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEP_SEEK_TOKEN}`
    },
    body: JSON.stringify({
      model: aiSettings.model,
      messages: [
        {
          role: 'user',
          content: aiSettings.prompt + ': ' + msg
        }
      ],
      stream: aiSettings.stream,
      temperature: aiSettings.temperature
    })
  })
  const res = await response.json()
  console.log('res from AI DEEPSEEK: ', res)
  return res.choices[0].message.content.trim()
}

export default askAI
