import type { Database } from "~~/types/database.types"

export function useAuth() {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  // Authentication state
  const isAuthenticated = computed(() => !!user.value)

  // Authentication actions
  const signOut = async () => {
    try {
      await client.auth.signOut()
    }
    catch (error) {
      console.error("Sign out error:", error)
      throw error
    }
  }

  const signInWithProvider = async (provider: "github" | "google") => {
    try {
      await client.auth.signInWithOAuth({ provider })
    }
    catch (error) {
      console.error(`${provider} sign in error:`, error)
      throw error
    }
  }

  // Convenience methods for specific providers
  const signInWithGitHub = () => signInWithProvider("github")
  const signInWithGoogle = () => signInWithProvider("google")

  return {
    // State
    user: readonly(user),
    isAuthenticated,

    // Actions
    signOut,
    signInWithGitHub,
    signInWithGoogle,
  }
}
