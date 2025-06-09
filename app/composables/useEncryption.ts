import { type EncryptionKeyData, encryptionManager } from "~/utils/encryption"

export function useEncryption() {
  const user = useSupabaseUser()
  const userKeyData = ref<EncryptionKeyData | null>(null)
  const isInitializing = ref(false)
  const encryptionSupported = ref(false)

  // Check if encryption is supported in the current environment
  onMounted(() => {
    encryptionSupported.value = !!(
      window.crypto
      && window.crypto.subtle
      && window.TextEncoder
      && window.TextDecoder
    )
  })

  /**
   * Initialize encryption for the current user
   */
  const initializeEncryption = async (): Promise<boolean> => {
    if (!user.value?.id || !encryptionSupported.value) {
      return false
    }

    if (userKeyData.value) {
      return true // Already initialized
    }

    isInitializing.value = true

    try {
      userKeyData.value = await encryptionManager.initializeUserEncryption(user.value.id)
      return true
    }
    catch (error) {
      console.error("Failed to initialize encryption:", error)
      return false
    }
    finally {
      isInitializing.value = false
    }
  }

  /**
   * Encrypt a message before storing
   */
  const encryptMessage = async (message: string): Promise<string> => {
    if (!userKeyData.value || !encryptionSupported.value) {
      // Fallback to plain text if encryption not available
      console.warn("Encryption not available, storing message in plain text")
      return message
    }

    try {
      const encrypted = await encryptionManager.encryptMessage(message, userKeyData.value)
      return JSON.stringify(encrypted)
    }
    catch (error) {
      console.error("Failed to encrypt message:", error)
      // Fallback to plain text on encryption failure
      return message
    }
  }

  /**
   * Decrypt a message after retrieving
   */
  const decryptMessage = async (encryptedMessage: string): Promise<string> => {
    if (!user.value?.id || !encryptionSupported.value) {
      return encryptedMessage
    }

    // Check if this is actually an encrypted message
    if (!encryptionManager.isEncryptedMessage(encryptedMessage)) {
      return encryptedMessage // Return plain text as-is
    }

    try {
      return await encryptionManager.decryptMessage(
        JSON.parse(encryptedMessage),
        user.value.id,
      )
    }
    catch (error) {
      console.error("Failed to decrypt message:", error)
      return "[Encrypted message - unable to decrypt]"
    }
  }

  /**
   * Auto-initialize encryption when user logs in
   */
  watch(user, async (newUser) => {
    if (newUser?.id && encryptionSupported.value) {
      await initializeEncryption()
    }
    else {
      userKeyData.value = null
    }
  }, { immediate: true })

  return {
    isInitializing: readonly(isInitializing),
    encryptionSupported: readonly(encryptionSupported),
    isEncryptionReady: computed(() => !!userKeyData.value && encryptionSupported.value),
    initializeEncryption,
    encryptMessage,
    decryptMessage,
  }
}
