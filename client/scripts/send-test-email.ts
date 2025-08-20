import { sendEmail } from '../src/lib/email'

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
