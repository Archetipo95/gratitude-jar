import { Resend } from 'resend'
import { defineEventHandler, readBody } from 'h3'

const resend = new Resend(process.env.RESEND_KEY)

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const senderEmail = body.senderEmail

    if (!senderEmail || !validateEmail(senderEmail)) {
      throw new Error('Invalid email address')
    }

    const data = await resend.emails.send({
      //from: 'Gratitude Jar <onboarding@resend.dev>',
      from: 'Gratitude Jar <ciao@ciao.ciao>',
      to: [senderEmail],
      subject: 'Weekly Reminder',
      html: '<strong>Don’t forget to submit your gratitude message for this week!</strong>',
    })

    // console log the data to see the response from the API
    // console.log(senderEmail)

    return { success: true, data }
  } catch (error: any) {
    console.error('Failed to send email:', error)
    return { success: false, error: error.message }
  }
})

// Simple email validation function
function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
