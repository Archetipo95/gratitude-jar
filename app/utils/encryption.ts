type EncryptionKeyData = {
  key: CryptoKey
  keyId: string
  salt: Uint8Array
}

type EncryptedMessage = {
  data: string // base64 encoded encrypted data
  iv: string // base64 encoded initialization vector
  keyId: string // identifier for the key used
  salt: string // base64 encoded salt
}

class EncryptionManager {
  private keyCache = new Map<string, CryptoKey>()
  private readonly KEY_DERIVATION_ITERATIONS = 100000
  private readonly KEY_LENGTH = 256

  /**
   * Initialize encryption for a user using WebAuthn or fallback to user-based key
   * This creates a deterministic key based on the user's authentication
   */
  async initializeUserEncryption(userId: string): Promise<EncryptionKeyData> {
    let keyMaterial: Uint8Array
    let keyId: string

    try {
      // Try to use WebAuthn for key derivation (most secure)
      keyMaterial = await this.deriveFromWebAuthn(userId)
      keyId = `webauthn_${userId}`
    }
    catch {
      // Fallback to user-based key derivation
      console.warn("WebAuthn not available, using fallback key derivation")
      keyMaterial = await this.deriveFromUserAuth(userId)
      keyId = `userauth_${userId}`
    }

    const salt = crypto.getRandomValues(new Uint8Array(16))
    const key = await this.deriveEncryptionKey(keyMaterial, salt)

    // Cache the key for performance
    this.keyCache.set(keyId, key)

    return {
      key,
      keyId,
      salt,
    }
  }

  /**
   * Derive key material from WebAuthn (when available)
   */
  private async deriveFromWebAuthn(userId: string): Promise<Uint8Array> {
    if (!window.PublicKeyCredential) {
      throw new Error("WebAuthn not supported")
    }

    // Check if there's an existing credential
    const credentials = await navigator.credentials.get({
      publicKey: {
        challenge: new TextEncoder().encode(`gratitude_key_${userId}`),
        allowCredentials: [],
        userVerification: "preferred",
      },
    }) as PublicKeyCredential | null

    if (credentials) {
      // Use existing credential's raw ID as key material
      return new Uint8Array(credentials.rawId)
    }

    // Create new credential for key derivation
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge: new TextEncoder().encode(`gratitude_key_${userId}`),
        rp: { name: "Gratitude Jar" },
        user: {
          id: new TextEncoder().encode(userId),
          name: userId,
          displayName: "Gratitude User",
        },
        pubKeyCredParams: [{
          alg: -7,
          type: "public-key",
        }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "preferred",
        },
      },
    }) as PublicKeyCredential

    return new Uint8Array(credential.rawId)
  }

  /**
   * Fallback key derivation from user authentication data
   */
  private async deriveFromUserAuth(userId: string): Promise<Uint8Array> {
    // Create a deterministic but secure key from user ID and browser/device info
    const deviceInfo = navigator.userAgent + navigator.language + screen.width + screen.height
    const keyString = `${userId}:${deviceInfo}:gratitude_jar_v1`

    return new TextEncoder().encode(keyString)
  }

  /**
   * Derive actual encryption key from key material
   */
  private async deriveEncryptionKey(keyMaterial: Uint8Array, salt: Uint8Array): Promise<CryptoKey> {
    const baseKey = await crypto.subtle.importKey(
      "raw",
      keyMaterial,
      "PBKDF2",
      false,
      ["deriveKey"],
    )

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: this.KEY_DERIVATION_ITERATIONS,
        hash: "SHA-256",
      },
      baseKey,
      {
        name: "AES-GCM",
        length: this.KEY_LENGTH,
      },
      false,
      ["encrypt", "decrypt"],
    )
  }

  /**
   * Encrypt a message
   */
  async encryptMessage(message: string, keyData: EncryptionKeyData): Promise<EncryptedMessage> {
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encoder = new TextEncoder()
    const data = encoder.encode(message)

    const encryptedData = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      keyData.key,
      data,
    )

    return {
      data: this.arrayBufferToBase64(encryptedData),
      iv: this.uint8ArrayToBase64(iv),
      keyId: keyData.keyId,
      salt: this.uint8ArrayToBase64(keyData.salt),
    }
  }

  /**
   * Decrypt a message
   */
  async decryptMessage(encryptedMessage: EncryptedMessage, userId: string): Promise<string> {
    let key = this.keyCache.get(encryptedMessage.keyId)

    if (!key) {
      // Recreate the key if not in cache
      const salt = this.base64ToUint8Array(encryptedMessage.salt)
      let keyMaterial: Uint8Array

      if (encryptedMessage.keyId.startsWith("webauthn_")) {
        keyMaterial = await this.deriveFromWebAuthn(userId)
      }
      else {
        keyMaterial = await this.deriveFromUserAuth(userId)
      }

      key = await this.deriveEncryptionKey(keyMaterial, salt)
      this.keyCache.set(encryptedMessage.keyId, key)
    }

    const encryptedData = this.base64ToArrayBuffer(encryptedMessage.data)
    const iv = this.base64ToUint8Array(encryptedMessage.iv)

    const decryptedData = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      encryptedData,
    )

    const decoder = new TextDecoder()
    return decoder.decode(decryptedData)
  }

  /**
   * Check if a message is encrypted (vs plain text legacy messages)
   */
  isEncryptedMessage(message: string): boolean {
    try {
      const parsed = JSON.parse(message)
      return !!(parsed.data && parsed.iv && parsed.keyId && parsed.salt)
    }
    catch {
      return false
    }
  }

  /**
   * Utility functions for base64 encoding/decoding
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)
    return this.uint8ArrayToBase64(bytes)
  }

  private uint8ArrayToBase64(uint8Array: Uint8Array): string {
    let binary = ""
    const len = uint8Array.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8Array[i]!)
    }
    return btoa(binary)
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64)
    const len = binary.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes.buffer
  }

  private base64ToUint8Array(base64: string): Uint8Array {
    const binary = atob(base64)
    const len = binary.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes
  }
}

// Export singleton instance
export const encryptionManager = new EncryptionManager()

// Types for external use
export type {
  EncryptedMessage,
  EncryptionKeyData,
}
