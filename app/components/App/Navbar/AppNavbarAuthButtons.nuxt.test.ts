import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import AppNavbarAuthButtons from "./AppNavbarAuthButtons.vue"

// Mock Supabase with minimal setup
let mockUserValue: any = null
const mockSupabaseUser = computed(() => mockUserValue)

vi.mock("#imports", async () => {
  const actual = await vi.importActual("#imports")
  return {
    ...actual,
    useSupabaseClient: () => ({}),
    useSupabaseUser: () => mockSupabaseUser,
  }
})

describe("appNavbarAuthButtons", () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    mockUserValue = null
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  // Helper functions using data-test-ids
  const getLogoutButton = () => wrapper.find("[data-test-id=\"logout-button\"]")
  const getLoginContainer = () => wrapper.find("[data-test-id=\"login-buttons-container\"]")
  const getGithubButton = () => wrapper.find("[data-test-id=\"github-login-button\"]")
  const getGoogleButton = () => wrapper.find("[data-test-id=\"google-login-button\"]")

  describe("component structure", () => {
    it("mounts successfully", async () => {
      wrapper = await mountSuspended(AppNavbarAuthButtons)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.vm).toBeTruthy()
    })

    it("renders login buttons when no user", async () => {
      wrapper = await mountSuspended(AppNavbarAuthButtons)

      expect(getLoginContainer().exists()).toBe(true)
      expect(getGithubButton().exists()).toBe(true)
      expect(getGoogleButton().exists()).toBe(true)
      expect(getLogoutButton().exists()).toBe(false)
    })

    it("has correct button text content", async () => {
      wrapper = await mountSuspended(AppNavbarAuthButtons)

      const githubButton = getGithubButton()
      const googleButton = getGoogleButton()

      expect(githubButton.text()).toContain("GitHub Login")
      expect(googleButton.text()).toContain("Google Login")
    })
  })
})
