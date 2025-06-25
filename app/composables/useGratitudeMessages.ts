import type { Database } from "~~/types/database.types"

export function useGratitudeMessages() {
  const client = useSupabaseClient<Database>()
  const {
    user,
    isAuthenticated,
  } = useAuth()
  const toast = useToast()

  // Submit a new gratitude message
  const submitMessage = async (weekNumber: number, selectedYear: number, message: string) => {
    if (!isAuthenticated.value) {
      throw new Error("User not authenticated")
    }

    if (!weekNumber || !message.trim()) {
      throw new Error("Week number and message are required")
    }

    try {
      const { error } = await client.from("gratitude_messages").insert([
        {
          week: weekNumber,
          year: selectedYear,
          message: message.trim(),
          user_id: user.value?.id,
        },
      ])

      if (error) {
        throw error
      }

      toast.add({ title: "Message submitted" })
      return { success: true }
    }
    catch (error) {
      console.error("Submit message error:", error)
      toast.add({
        title: "Failed to submit message",
        color: "error",
      })
      throw error
    }
  }

  // Get all messages for the current user
  const getUserMessages = async () => {
    if (!isAuthenticated.value || !user.value) {
      return []
    }

    try {
      const {
        data,
        error,
      } = await client
        .from("gratitude_messages")
        .select("id, message, week, year")
        .eq("user_id", user.value.id)
        .order("week", { ascending: true })

      if (error) {
        throw error
      }

      return data || []
    }
    catch (error) {
      console.error("Get messages error:", error)
      return []
    }
  }

  // Check if a message exists for a specific week and year
  const hasMessage = (messages: any[], weekNumber: number, year: number) => {
    return messages?.some(message => message.week === weekNumber && message.year === year) || false
  }

  // Get a specific message for a week and year
  const getMessage = (messages: any[], weekNumber: number, year: number) => {
    const message = messages?.find(message => message.week === weekNumber && message.year === year)
    return message ? message.message : ""
  }

  return {
    // Actions
    submitMessage,
    getUserMessages,

    // Utilities
    hasMessage,
    getMessage,
  }
}
