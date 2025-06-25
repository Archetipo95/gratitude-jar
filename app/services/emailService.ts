// Service layer for complex business operations
export class EmailService {
  private apiUrl: string

  constructor() {
    this.apiUrl = "/api"
  }

  async sendReminderEmail(senderEmail: string): Promise<{ success: boolean, data?: any, error?: string }> {
    try {
      const response = await $fetch(`${this.apiUrl}/sendReminderEmail`, {
        method: "POST",
        body: { senderEmail },
      }) as { success: boolean, data?: any, error?: string }

      return response
    }
    catch (error) {
      console.error("Email service error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    return emailRegex.test(email)
  }

  async sendWeeklySummary(userEmail: string, weeklyMessages: string[]): Promise<boolean> {
    // Future implementation for weekly summaries
    try {
      // This would send a formatted email with all messages for the week
      console.log("Sending weekly summary to:", userEmail, "Messages:", weeklyMessages)
      return true
    }
    catch (error) {
      console.error("Weekly summary error:", error)
      return false
    }
  }
}

// Export singleton instance
export const emailService = new EmailService()
