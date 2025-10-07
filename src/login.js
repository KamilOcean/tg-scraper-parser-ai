import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { TelegramClient } = require('telegram')
const { StoreSession } = require('telegram/sessions')
require('dotenv').config({ path: '.env' })

import input from 'input'

const apiId = Number(process.env.API_ID)
const apiHash = process.env.API_HASH
const args = process.argv.slice(2)
const phone = args[0]
const storeSession = new StoreSession(phone)

const login = async () => {
  const client = new TelegramClient(storeSession, apiId, apiHash, {
    connectionRetries: 5,
  })
  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () => await input.text('Please enter the code you received in TG: '),
    onError: (err) => console.log(err),
  })
  console.log('You should now be connected.')
  console.log(storeSession.save())
  return client
}

export default login