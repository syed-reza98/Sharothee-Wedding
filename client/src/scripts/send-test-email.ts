import { sendEmail } from '../lib/email'
import fs from 'fs'
import path from 'path'
import { config as loadEnv } from 'dotenv'

// Load env from .env.local if present, otherwise .env
const envLocal = path.resolve(process.cwd(), '.env.local')
const envDefault = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envLocal)) {
  loadEnv({ path: envLocal })
} else if (fs.existsSync(envDefault)) {
  loadEnv({ path: envDefault })
}

async function main() {
  const to = process.env.TEST_EMAIL_TO || process.env.GMAIL_USER
  if (!to) {
    console.error('Please set TEST_EMAIL_TO or GMAIL_USER in env to test email sending.')
    process.exit(1)
  }
  const res = await sendEmail({
    to: [to],
    subject: 'Test Email - Wedding Site',
    html: '<p>This is a test email from the RSVP system.</p>'
  })
  console.log('Result:', res)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
