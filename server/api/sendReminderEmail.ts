/* eslint-disable node/no-process-env */

import { defineEventHandler, readBody } from "h3"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_KEY)

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const senderEmail = body.senderEmail

    if (!senderEmail || !validateEmail(senderEmail)) {
      throw new Error("Invalid email address")
    }

    const data = await resend.emails.send({
      from: "Gratitude Jar <onboarding@resend.dev>",
      to: [senderEmail],
      subject: "Weekly Reminder",
      html: "<strong>Don’t forget to submit your gratitude message for this week!</strong>",
    })

    return { success: true, data }
  }
  catch (error: any) {
    console.error("Failed to send email:", error)
    return { success: false, error: error.message }
  }
})

// Simple email validation function
function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  return re.test(email)
}
