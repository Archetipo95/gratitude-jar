import { beforeAll, describe, expect, it, vi } from "vitest"

import { encryptionManager } from "./encryption"

// Mock window objects for testing
beforeAll(() => {
  globalThis.window = {
    crypto: {
      getRandomValues: (arr: Uint8Array) => {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Math.floor(Math.random() * 256)
        }
        return arr
      },
      subtle: {
        importKey: vi.fn().mockResolvedValue({}),
        deriveKey: vi.fn().mockResolvedValue({}),
        encrypt: vi.fn().mockResolvedValue(new ArrayBuffer(32)),
        decrypt: vi.fn().mockResolvedValue(new globalThis.TextEncoder().encode("test message")),
      },
    },
    TextEncoder: globalThis.TextEncoder,
    TextDecoder: globalThis.TextDecoder,
    btoa: globalThis.btoa,
    atob: globalThis.atob,
    navigator: {
      userAgent: "test-agent",
      language: "en-US",
    },
    screen: {
      width: 1920,
      height: 1080,
    },
    PublicKeyCredential: undefined, // Simulate no WebAuthn support
  } as any
})

describe("encryptionManager", () => {
  const testUserId = "test-user-123"
  const testMessage = "This is a test gratitude message"

  it("should detect encrypted vs plain text messages", () => {
    const plainText = "Hello world"
    const encryptedFormat = JSON.stringify({
      data: "encrypted-data",
      iv: "initialization-vector",
      keyId: "key-id",
      salt: "salt-value",
    })

    expect(encryptionManager.isEncryptedMessage(plainText)).toBe(false)
    expect(encryptionManager.isEncryptedMessage(encryptedFormat)).toBe(true)
  })

  it("should handle missing properties in encrypted message detection", () => {
    const incompleteEncrypted = JSON.stringify({
      data: "encrypted-data",
      iv: "initialization-vector",
      // missing keyId and salt
    })

    expect(encryptionManager.isEncryptedMessage(incompleteEncrypted)).toBe(false)
  })

  it("should handle malformed JSON in encrypted message detection", () => {
    const malformedJson = "{ incomplete json"

    expect(encryptionManager.isEncryptedMessage(malformedJson)).toBe(false)
  })

  it("should initialize user encryption with fallback method", async () => {
    const keyData = await encryptionManager.initializeUserEncryption(testUserId)

    expect(keyData).toHaveProperty("key")
    expect(keyData).toHaveProperty("keyId")
    expect(keyData).toHaveProperty("salt")
    expect(keyData.keyId).toContain("userauth_")
  })

  it("should encrypt and decrypt messages", async () => {
    const keyData = await encryptionManager.initializeUserEncryption(testUserId)

    const encrypted = await encryptionManager.encryptMessage(testMessage, keyData)
    expect(encrypted).toHaveProperty("data")
    expect(encrypted).toHaveProperty("iv")
    expect(encrypted).toHaveProperty("keyId")
    expect(encrypted).toHaveProperty("salt")

    const decrypted = await encryptionManager.decryptMessage(encrypted, testUserId)
    expect(decrypted).toBe(testMessage)
  })
})
