import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import AppNavbarGreeting from "./AppNavbarGreeting.vue"

// Mock Supabase user
let mockUserValue: any = null
const mockSupabaseUser = computed(() => mockUserValue)

vi.mock("#imports", async () => {
  const actual = await vi.importActual("#imports")
  return {
    ...actual,
    useSupabaseUser: () => mockSupabaseUser,
  }
})

describe("appNavbarGreeting", () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    mockUserValue = null
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe("component structure", () => {
    beforeEach(async () => {
      wrapper = await mountSuspended(AppNavbarGreeting)
    })

    it("mounts successfully", () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.vm).toBeTruthy()
    })

    it("renders as h2 element", () => {
      const heading = wrapper.find("h2")
      expect(heading.exists()).toBe(true)
    })

    it("has correct styling classes", () => {
      const heading = wrapper.find("h2")
      expect(heading.exists()).toBe(true)
      expect(heading.classes()).toContain("uppercase")
    })

    it("displays some greeting text", () => {
      expect(wrapper.text()).toMatch(/Hello/)
    })
  })
})
