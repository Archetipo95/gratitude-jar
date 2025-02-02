import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_KEY)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const senderEmail = body.senderEmail

  try {
    const data = await resend.emails.send({
      from: 'Gratitude Jar <onboarding@resend.dev>',
      to: [senderEmail],
      subject: 'Hello world',
      html: '<strong>It works!</strong>',
    })

    return data
  } catch (error) {
    return { error }
  }
})
