import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import NavMobileMenu from "./NavMobileMenu.vue"

describe("navMobileMenu", () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(NavMobileMenu)
  })

  // Helper functions using data-test-ids
  const getMobileMenu = () => wrapper.find("[data-test-id=\"nav-mobile-menu\"]")
  const getMenuToggle = () => wrapper.find("[data-test-id=\"mobile-menu-toggle\"]")
  const getHamburgerButton = () => wrapper.find("[data-test-id=\"hamburger-button\"]")
  const getHamburgerIcon = () => wrapper.find("[data-test-id=\"hamburger-icon\"]")
  const getMenuContent = () => wrapper.find("[data-test-id=\"mobile-menu-content\"]")
  const getMenuInner = () => wrapper.find("[data-test-id=\"mobile-menu-inner\"]")
  const getGreetingContainer = () => wrapper.find("[data-test-id=\"mobile-greeting-container\"]")
  const getAuthContainer = () => wrapper.find("[data-test-id=\"mobile-auth-container\"]")

  describe("component structure", () => {
    it("renders mobile menu container", () => {
      const mobileMenu = getMobileMenu()
      expect(mobileMenu.exists()).toBe(true)
      expect(mobileMenu.classes()).toContain("md:hidden")
    })

    it("renders hamburger toggle checkbox", () => {
      const toggle = getMenuToggle()
      expect(toggle.exists()).toBe(true)
      expect(toggle.attributes("type")).toBe("checkbox")
      expect(toggle.classes()).toContain("sr-only")
      expect(toggle.classes()).toContain("peer")
    })

    it("renders hamburger button with correct attributes", () => {
      const button = getHamburgerButton()
      expect(button.exists()).toBe(true)
      expect(button.attributes("for")).toBe("mobile-menu-toggle")
      expect(button.attributes("aria-label")).toBe("Toggle mobile menu")
    })

    it("renders hamburger icon", () => {
      const icon = getHamburgerIcon()
      expect(icon.exists()).toBe(true)
    })

    it("renders menu content container", () => {
      const content = getMenuContent()
      expect(content.exists()).toBe(true)
      expect(content.classes()).toContain("hidden")
      expect(content.classes()).toContain("peer-checked:block")
    })
  })

  describe("menu layout", () => {
    it("has correct inner menu padding and spacing", () => {
      const inner = getMenuInner()
      expect(inner.exists()).toBe(true)
      expect(inner.classes()).toContain("p-4")
      expect(inner.classes()).toContain("space-y-4")
    })
  })

  describe("component integration", () => {
    it("renders NavGreeting in centered container", () => {
      const greetingContainer = getGreetingContainer()
      expect(greetingContainer.exists()).toBe(true)

      const navGreeting = greetingContainer.findComponent({ name: "NavGreeting" })
      expect(navGreeting.exists()).toBe(true)
    })

    it("renders NavAuthButtons in column layout", () => {
      const authContainer = getAuthContainer()
      expect(authContainer.exists()).toBe(true)

      const navAuthButtons = authContainer.findComponent({ name: "NavAuthButtons" })
      expect(navAuthButtons.exists()).toBe(true)
    })
  })
})
